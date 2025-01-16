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
import PagoCuota from "./PagoCuota.js";
import GastoExtraordinario from "./GastoExtraordinario.js";
import ActividadBus from "./ActividadBus.js";
import Bus from "./Bus.js";
import UsuarioColegio from "./UsuarioColegio.js";
import Banco from "./Banco.js";
import CuentaBancariaColegio from "./CuentaBancariaColegio.js";
import AsignacionGastoExtra from "./AsignacionGastoExtra.js";
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
    PagoCuota,
    GastoExtraordinario,
    ActividadBus,
    Bus,
    UsuarioColegio,
    Banco,
    CuentaBancariaColegio,
    AsignacionGastoExtra,
};

Object.values(models).forEach((model) => {
    if (model.init) model.init(db);
});

// Configurar asociaciones
setupAssociations(models);

export { db, models };
