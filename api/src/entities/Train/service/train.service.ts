import {Injectable} from "@nestjs/common";
import * as XLSX from "xlsx";
import {InjectRepository} from "@nestjs/typeorm";
import {TrainEntity} from "../models/train.entity";
import {Repository} from "typeorm";
import {format} from 'date-fns'
import {createTrainDTO} from "../models/train.dto";

@Injectable()
export class TrainService {
    constructor(
        @InjectRepository(TrainEntity)
        private readonly trainRepository: Repository<TrainEntity>,
    ) {}

    private async calculateStats(trains: any[]): Promise<{ stats: { tsg_H00: number, tsg_H05: number, vae_H00: number, vae_H05: number, crml_H00: number, crml_H05: number }, trains: any[] }> {
        function convertirHeuresEnMinutes(heure: string): number {
            const [heures, minutes] = heure.split(':').map(Number);
            return heures * 60 + minutes;
        }

        function addMinutesToTime(time: string, minutesToAdd: string): string {
            const [hours, minutes] = time.split(':').map(Number);
            const minutesToAddNumber = Number(minutesToAdd);
            const date = new Date();
            date.setHours(hours, minutes + minutesToAddNumber, 0);
            const newHours = date.getHours().toString().padStart(2, '0');
            const newMinutes = date.getMinutes().toString().padStart(2, '0');
            return `${newHours}:${newMinutes}`;
        }

        function calculateTimeDifferenceAndPercentage(train: any, timeKey: string, limits: number[], counts: number[], errorTime: number): [number[], number] {
            if (train[timeKey] && train.arrive) {
                const arrivePlusRetard = addMinutesToTime(train.arrive, train.retard_re_ut);
                const heureFinReelle = train[timeKey].slice(11, 16);
                const timeDifference = convertirHeuresEnMinutes(heureFinReelle) - convertirHeuresEnMinutes(arrivePlusRetard);

                for (let i = 0; i < limits.length; i++) {
                    if (timeDifference <= limits[i]) {
                        counts[i]++;
                    }
                }

                if (timeDifference > limits[1]) {
                    errorTime++;
                }
            }
            return [counts, errorTime];
        }

        const totalTrains = trains.length;
        const countLimits = [30, 35];
        const countVAELimits = [30, 35];
        const countCRMLLimits = [25, 30];
        const countARMLimits = [20, 25];
        const countNETTLimits = [20, 25];
        const countRALimits = [0, 5];

        let counts = [0, 0];
        let countsVAE = [0, 0];
        let countsCRML = [0, 0];
        let countsARM = [0, 0];
        let countsNETT = [0, 0];
        let countsRA = [0, 0];

        let countsErrorVAE = 0;
        let countsErrorCRML = 0;
        let countsErrorARM = 0;
        let countsErrorNETT = 0;
        let countsErrorRA = 0;

        for (const train of trains) {
            [countsVAE, countsErrorVAE] = calculateTimeDifferenceAndPercentage(train, 'vae_heure_fin_reelle', countVAELimits, countsVAE, countsErrorVAE);
            [countsCRML, countsErrorCRML] = calculateTimeDifferenceAndPercentage(train, 'crml_heure_fin_reelle', countCRMLLimits, countsCRML, countsErrorCRML);
            [countsARM, countsErrorARM] = calculateTimeDifferenceAndPercentage(train, 'armement_heure_fin_reelle', countARMLimits, countsARM, countsErrorARM);
            [countsNETT, countsErrorNETT] = calculateTimeDifferenceAndPercentage(train, 'nettoyage_heure_fin_reelle', countNETTLimits, countsNETT, countsErrorNETT);
            const tempsSousGare = convertirHeuresEnMinutes(train.temps_sous_gare);

            for (let i = 0; i < countLimits.length; i++) {
                if (tempsSousGare <= countLimits[i]) {
                    counts[i]++;
                }
            }

            for (let i = 0; i < countRALimits.length; i++) {
                if (train.retard_re_ut <= countRALimits[i]) {
                    countsRA[i]++;
                }
            }

            if (train.retard_re_ut > countRALimits[1]) {
                countsErrorRA++;
            }
        }

        const stats = {
            tsg_H00: Math.round((counts[0] / totalTrains) * 100),
            tsg_H05: Math.round((counts[1] / totalTrains) * 100),
            vae_H00: Math.round((countsVAE[0] / totalTrains) * 100),
            vae_H05: Math.round((countsVAE[1] / totalTrains) * 100),
            crml_H00: Math.round((countsCRML[0] / totalTrains) * 100),
            crml_H05: Math.round((countsCRML[1] / totalTrains) * 100),
            arm_H00: Math.round((countsARM[0] / totalTrains) * 100),
            arm_H05: Math.round((countsARM[1] / totalTrains) * 100),
            nett_H00: Math.round((countsNETT[0] / totalTrains) * 100),
            nett_H05: Math.round((countsNETT[1] / totalTrains) * 100),
            ra_H00: Math.round((countsRA[0] / totalTrains) * 100),
            ra_H05: Math.round((countsRA[1] / totalTrains) * 100),
            err_vae: Math.round((countsErrorVAE / totalTrains) * 100),
            err_crml: Math.round((countsErrorCRML / totalTrains) * 100),
            err_arm: Math.round((countsErrorARM / totalTrains) * 100),
            err_nett: Math.round((countsErrorNETT / totalTrains) * 100),
            err_ra: Math.round((countsErrorRA / totalTrains) * 100),
        };

        return {
            stats,
            trains,
        };
    }

    async findAll() {
        const trains = await this.trainRepository.find();
        trains.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('/'));
            const dateB = new Date(b.date.split('/').reverse().join('/'));
            return dateA.getTime() - dateB.getTime();
        });
        return trains;
    }

    async create(files, date) {
        const {file1, file2} = files;

        const calculateTempsSousGare = (time1, time2) => {
            // Parse the input strings into Date objects
            const date1 = new Date(`2023-01-01T${time1}:00`);
            const date2 = new Date(`2023-01-01T${time2}:00`);

            // Calculate the absolute difference in milliseconds
            let diffMs = Math.abs(date2.getTime() - date1.getTime());

            // Convert milliseconds to minutes
            const diffMins = Math.floor(diffMs / 60000);

            // Calculate the difference in hours and minutes
            const diffHrs = Math.floor(diffMins / 60);
            const diffMinsRemain = diffMins % 60;

            // Format the difference as "hh:mm"
            // Return the difference as a string
            return `${diffHrs.toString().padStart(2, '0')}:${diffMinsRemain.toString().padStart(2, '0')}`;
        };

        // Read the data from the two Excel files
        const workbook1 = XLSX.read(file1[0].buffer, { type: 'buffer' });
        const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
        const data1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });

        const workbook2 = XLSX.read(file2[0].buffer, { type: 'buffer' });
        const sheet2 = workbook2.Sheets[workbook2.SheetNames[1]];
        const data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });

        const trainsWithFollowingNumber = new Map();

        // Trouver les trains qui commencent par '90'
        const trainsStartingWith90 = data1.filter(([trainNumber]) => trainNumber?.startsWith('90') && trainNumber?.length > 2);

        // Itérer sur les trains trouvés et ajouter leurs informations au Map
        trainsStartingWith90.forEach(train => {
            const trainNumber = train[0];
            const shortTrainNumber = trainNumber.substring(2);
            trainsWithFollowingNumber.set(shortTrainNumber, train);
        });

        // Itérer sur data1 pour trouver les trains avec des numéros correspondants
        data1.forEach(train => {
            const trainNumber = train[0];

            if (trainsWithFollowingNumber.has(trainNumber)) {
                // Fusionner les informations des trains avec des numéros correspondants
                const existingTrain = trainsWithFollowingNumber.get(trainNumber);
                const combinedTrain = existingTrain.concat((train as Array<any>).slice(1));
                trainsWithFollowingNumber.set(trainNumber, combinedTrain);
            }
        });

        const combinedData = [];

        // Dans la boucle, si trainData existe dans le tableau combinedData, on l'update, sinon on push dans le tableau

        // Combine the data from both tables
        for (const row of data2) {
            const trainNumber = row[1];
            const trainData = trainsWithFollowingNumber.get(trainNumber);
            const findTrain = combinedData.find((train) => train.numero_train === '90' + trainNumber);
            if (trainData) {
                if (findTrain) {
                    switch (row[7])  {
                        case 'VAE':
                            findTrain.vae_heure_debut_theorique = row[16];
                            findTrain.vae_heure_debut_reelle = row[17];
                            findTrain.vae_heure_fin_theorique = row[18];
                            findTrain.vae_heure_fin_reelle = row[19];
                            break;
                        case 'Prés CRML/CRLO':
                            findTrain.crml_heure_fin_theorique = row[18];
                            findTrain.crml_heure_fin_reelle = row[19];
                            break;
                        case 'Désarmement':
                            findTrain.armement_heure_debut_theorique = row[16];
                            findTrain.armement_heure_debut_reelle = row[17];
                            findTrain.armement_heure_fin_theorique = row[18];
                            findTrain.armement_heure_fin_reelle = row[19];
                            break
                        case 'Nettoyage ext':
                            findTrain.nettoyage_heure_debut_theorique = row[16];
                            findTrain.nettoyage_heure_debut_reelle = row[17];
                            findTrain.nettoyage_heure_fin_theorique = row[18];
                            findTrain.nettoyage_heure_fin_reelle = row[19];
                            break
                    }
                } else {
                    const combinedRow: createTrainDTO = {
                        date: date.replace(/-/g, '/'),
                        numero_train: trainData[0],
                        origine: trainData[1],
                        destination: trainData[2],
                        arrive: trainData[13],
                        depart: trainData[5],
                        retard_garage: trainData[6].toString(),
                        voie: trainData[7],
                        composition: trainData[9],
                        re_ut: trainData[8],
                        retard_re_ut: trainData[16],
                        temps_sous_gare: calculateTempsSousGare(trainData[5], trainData[13]),
                        vae_heure_debut_theorique: '0',
                        vae_heure_debut_reelle: '0',
                        vae_heure_fin_theorique: '0',
                        vae_heure_fin_reelle: '0',
                        armement_heure_debut_theorique: '0',
                        armement_heure_debut_reelle: '0',
                        armement_heure_fin_theorique: '0',
                        armement_heure_fin_reelle: '0',
                        nettoyage_heure_debut_theorique: '0',
                        nettoyage_heure_debut_reelle: '0',
                        nettoyage_heure_fin_theorique: '0',
                        nettoyage_heure_fin_reelle: '0',
                    };

                    combinedData.push(combinedRow);
                }
            }
        }

        await this.trainRepository.save(combinedData);

        return combinedData;
    }

    async generateBase(startDate: Date, endDate: Date): Promise<any> {
        const oneDay = 24 * 60 * 60 * 1000;
        const baseData = [];

        // Loop through each day in the date range
        for (let date = new Date(startDate); date <= endDate; date.setTime(date.getTime() + oneDay)) {
            const dateFormatted = format(date, 'DD/MM/YYYY');

            // Get all trains for the current day
            const trains = await this.trainRepository.find({
                where: {
                    date: dateFormatted,
                },
            });

            const totalTrains = trains.length;

            // Calculate the ponctu_garage_H00 and ponctu_garage_H05 percentages for the current day
            let ponctu_garage_H00 = 0;
            let ponctu_garage_H05 = 0;

            for (const train of trains) {
                const temps_sous_gare = train.temps_sous_gare;
                const [hours, minutes, seconds] = temps_sous_gare.split(':');
                const temps_sous_gare_en_secondes = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

                if (temps_sous_gare_en_secondes <= 1800) { // 1800 secondes = 30 minutes
                    ponctu_garage_H00++;
                }

                if (temps_sous_gare_en_secondes <= 2100) { // 2100 secondes = 35 minutes
                    ponctu_garage_H05++;
                }
            }

            ponctu_garage_H00 = (ponctu_garage_H00 / totalTrains) * 100;
            ponctu_garage_H05 = (ponctu_garage_H05 / totalTrains) * 100;

            // Add the data for the current day to the baseData array
            baseData.push({
                date: dateFormatted,
                ponctu_garage_H00,
                ponctu_garage_H05,
            });
        }

        return baseData;
    }

    async getTrainsOfOneDay(date: string) {
        const trains = await this.trainRepository.find({
            where: {
                date: date,
            },
        });

        return this.calculateStats(trains);
    }

    async getMonthlyStats(start_date_str: string, end_date_str: string): Promise<any> {
        const trains = await this.trainRepository
            .createQueryBuilder('train')
            .where("STR_TO_DATE(train.date, '%d/%m/%Y') >= STR_TO_DATE(:formatted_start_date, '%d/%m/%Y')", { formatted_start_date: start_date_str.replace(new RegExp('-', 'g'), '/') })
            .andWhere("STR_TO_DATE(train.date, '%d/%m/%Y') <= STR_TO_DATE(:formatted_end_date, '%d/%m/%Y')", { formatted_end_date: end_date_str.replace(new RegExp('-', 'g'), '/')})
            .getMany();

        return this.calculateStats(trains);
    }

    async updatePropertyTimeInStation(): Promise<string> {
        // Get all trains from the database
        const trains = await this.trainRepository.find();

        function soustraireHeures(heure1, heure2) {
            const [h1, m1] = heure1.split(':').map(Number);
            const [h2, m2] = heure2.split(':').map(Number);

            let heures = h1 - h2;
            let minutes = m1 - m2;

            if (minutes < 0) {
                heures -= 1;
                minutes += 60;
            }

            if (heures < 0) {
                heures += 24;
            }

            return `${heures < 10 ? '0' : ''}${heures}:${minutes < 10 ? '0' : ''}${minutes}`;
        }

        function addMinutes(heure, minutesToAdd) {
            const [heures, minutes] = heure.split(':').map(Number);
            const minutesToAddNumber = parseInt(minutesToAdd, 10);

            const date = new Date(0, 0, 0, heures, minutes);
            date.setMinutes(date.getMinutes() + minutesToAddNumber);

            const heuresResultat = date.getHours();
            const minutesResultat = date.getMinutes();

            return `${heuresResultat < 10 ? '0' : ''}${heuresResultat}:${minutesResultat < 10 ? '0' : ''}${minutesResultat}`;
        }

        // Update the temps_sous_gare property for each train
        for (const train of trains) {
            // Calculate the difference between the departure time and the arrival time
            // Update the temps_sous_gare property to the difference in hours and minutes
            if(train.depart?.length > 0 && train.arrive?.length > 0) {
                let trainDepart = addMinutes(train.depart, train.retard_garage);
                let trainArrive = addMinutes(train.arrive, train.retard_re_ut);
                train.temps_sous_gare = soustraireHeures(trainDepart, trainArrive);
            }
        }

        // Save the updated trains to the database
        await this.trainRepository.save(trains);

        // Return a success message
        return 'Temps sous gare updated successfully.';
    }
}
