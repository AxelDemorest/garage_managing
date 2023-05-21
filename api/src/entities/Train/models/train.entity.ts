import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrainEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null  })
    numero_train: string;

    @Column({ default: null  })
    origine: string;

    @Column({ default: null  })
    destination: string;

    @Column({ default: null  })
    arrive: string;

    @Column({ default: null  })
    depart: string;

    @Column({ default: null  })
    retard_garage: string;

    @Column({ default: null  })
    voie: string;

    @Column({ default: null  })
    composition: string;

    @Column({ default: null  })
    re_ut: string;

    @Column({ default: null  })
    retard_re_ut: string;

    @Column({ default: null  })
    temps_sous_gare: string;

    @Column({ default: null  })
    vae_heure_debut_theorique: string;

    @Column({ default: null  })
    vae_heure_debut_reelle: string;

    @Column({ default: null  })
    vae_heure_fin_theorique: string;

    @Column({ default: null  })
    vae_heure_fin_reelle: string;

    @Column({ default: null  })
    crml_heure_fin_theorique: string;

    @Column({ default: null  })
    crml_heure_fin_reelle: string;

    @Column({ default: null  })
    armement_heure_debut_theorique: string;

    @Column({ default: null  })
    armement_heure_debut_reelle: string;

    @Column({ default: null  })
    armement_heure_fin_theorique: string;

    @Column({ default: null  })
    armement_heure_fin_reelle: string;

    @Column({ default: null  })
    nettoyage_heure_debut_theorique: string;

    @Column({ default: null  })
    nettoyage_heure_debut_reelle: string;

    @Column({ default: null  })
    nettoyage_heure_fin_theorique: string;

    @Column({ default: null  })
    nettoyage_heure_fin_reelle: string;

    @Column({ default: null  })
    date: string;
}
