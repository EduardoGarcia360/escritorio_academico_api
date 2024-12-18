import db from "../database/db.js";
import Usuario from "./Usuario.js";
import Colegio from "./Colegio.js";
import CicloEscolar from "./CicloEscolar.js";
import NivelEducacion from "./NivelEducacion.js";
import Jornada from "./Jornada.js";
import JornadaCicloEscolar from "./JornadaCicloEscolar.js";
import Grado from "./Grado.js";
import PersonalDocente from "./PersonalDocente.js";
import Estudiante from "./Estudiante.js";
import AsignacionDocenteGrado from "./AsignacionDocenteGrado.js";
import AsignacionEstudianteGrado from "./AsignacionEstudianteGrado.js";
import Tutor from "./Tutor.js";
import TutorEstudiante from "./TutorEstudiante.js";
import CuotaColegio from "./CuotaColegio.js";
import CuotaEstudiante from "./CuotaEstudiante.js";
import setupAssociations from "./associations.js";

// Inicializar modelos
const models = {
    Usuario,
    Colegio,
    CicloEscolar,
    NivelEducacion,
    Jornada,
    JornadaCicloEscolar,
    Grado,
    PersonalDocente,
    Estudiante,
    AsignacionDocenteGrado,
    AsignacionEstudianteGrado,
    Tutor,
    TutorEstudiante,
    CuotaColegio,
    CuotaEstudiante,
};

Object.values(models).forEach((model) => {
    if (model.init) model.init(db);
});

// Configurar asociaciones
setupAssociations(models);

export { db, models };
