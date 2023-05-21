export class createTrainDTO {
    readonly numero_train?: string;
    readonly origine: string;
    readonly destination: string;
    readonly arrive: string;
    readonly depart?: string;
    readonly retard_garage: string;
    readonly voie?: string;
    readonly composition?: string;
    readonly re_ut?: string;
    readonly retard_re_ut?: string;
    readonly temps_sous_gare?: string;
    readonly vae_heure_debut_theorique?: string;
    readonly vae_heure_debut_reelle?: string;
    readonly vae_heure_fin_theorique?: string;
    readonly vae_heure_fin_reelle?: string;
    readonly crml_heure_fin_theorique?: string;
    readonly crml_heure_fin_reelle?: string;
    readonly armement_heure_debut_theorique?: string;
    readonly armement_heure_debut_reelle?: string;
    readonly armement_heure_fin_theorique?: string;
    readonly armement_heure_fin_reelle?: string;
    readonly nettoyage_heure_debut_theorique?: string;
    readonly nettoyage_heure_debut_reelle?: string;
    readonly nettoyage_heure_fin_theorique?: string;
    readonly nettoyage_heure_fin_reelle?: string;
    readonly date?: string;
}
