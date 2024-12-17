import db from "../database/db.js";
import Usuario from "./Usuario.js";
import Colegio from "./Colegio.js";
import CicloEscolar from "./CicloEscolar.js";
import NivelEducacion from "./NivelEducacion.js";
import Jornada from "./Jornada.js";
import JornadaCicloEscolar from "./JornadaCicloEscolar.js";
import setupAssociations from "./associations.js";

// Inicializar modelos
const models = {
    Usuario,
    Colegio,
    CicloEscolar,
    NivelEducacion,
    Jornada,
    JornadaCicloEscolar,
};

Object.values(models).forEach((model) => {
    if (model.init) model.init(db);
});

// Configurar asociaciones
setupAssociations(models);

export { db, models };
