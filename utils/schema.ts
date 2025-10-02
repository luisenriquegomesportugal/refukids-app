import { ParsedToken } from "firebase/auth";

export type FirebaseId = string

export interface Endereco {
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
}

export interface EventoCheckinDetalhe {
    value: string,
    label?: string
}

export interface EventoCheckin {
    id: Checkin['id'];
    tipo: "Check-in" | "Acolhimento" | "Notificação" | "Check-out";
    feitoPor: Usuario['cpf'];
    cadastradoEm: string;
    detalhes: Record<FirebaseId, EventoCheckinDetalhe>
}

export type CriancasTurmaCheckins = Record<FirebaseId, Checkin['id']>


export interface Culto {
    id: string; // Data do culto em ISO
    turmas: Record<Turma['id'], CriancasTurmaCheckins>;
}

export interface Turma {
    id: "Refubabies" | "Refukids 1" | "Refukids 2" | "Refuteens";
    idadeReferencia: number[];
}

export interface Checkin {
    id: FirebaseId;
    familiaId: Familia['id'];
    criancaId: Crianca['id'];
    responsavelId: Responsavel['id'];
    turmaId: Turma['id'];
    impressoraId: FirebaseId;
    cultoId: Culto['id'];
    eventos: Record<FirebaseId, EventoCheckin>;
    cadastradoEm: string;
    checkinEm: string;
    checkinPor: Usuario['cpf'];
    acolhidaEm: string;
    acolhidaPor: Usuario['cpf'];
    acolhidaFoto?: string;
    checkoutEm: string;
    checkoutPor: Usuario['cpf'];
    checkoutPara: Responsavel['id'];
    checkoutFoto?: string;
}

export interface NotificacaoPayload {
    titulo: string;
    corpo: string;
}

export interface Notificacao {
    id: FirebaseId;
    titulo: string;
    imagem?: string;
    corpo: string;
    cadastradoEm: string;
    notificadoPor: string;
    notificadoPara: string;
    lida?: boolean
}

export interface Usuario {
    id: FirebaseId;
    cpf: string;
    email?: string;
    nome: string;
    foto: string;
    familia: string;
    notificacoes?: Record<FirebaseId, Notificacao>;
    notificacoesNaoLidas?: Record<FirebaseId, Notificacao>;
    notificacoesToken?: string;
    cadastradoEm: string;
    cadastroFinalizado: boolean;
}

export interface CriancaCheckin {
    data: string;
    id: string;
}

export interface Crianca {
    id: string;
    nome: string;
    foto: string;
    dataNascimento: string;
    sexo: string;
    celula?: string;
    observacao?: string;
    familia: string;
    cadastradoEm: string;
    checkins?: Record<FirebaseId, CriancaCheckin>;
}

export interface Responsavel extends Endereco {
    id: FirebaseId
    cpf: string;
    nome: string;
    foto: string;
    sexo?: string;
    telefone: string;
    parentesco: string;
    familia: Familia['id'];
    cadastradoEm: string;
    participaDeCelula: "Sim" | "Não";
    rede: string;
    celula: string;
}

export interface Tio extends Responsavel { }

export interface Familia {
    id: FirebaseId;
    nome: string;
    criancas?: Record<FirebaseId, Crianca['id']>;
    responsaveis?: Record<FirebaseId, Responsavel['id']>;
    tios?: Record<FirebaseId, Tio['id']>;
    cadastradoEm: string;
}

export interface Refukids {
    usuarios: Record<Usuario['id'], Usuario>;
    familias: Record<Familia['id'], Familia>;
    cultos: Record<Culto['id'], Culto>;
    checkins: Record<Checkin['id'], Checkin>;
    criancas: Record<Crianca['id'], Crianca>
    notificacoes: Record<Notificacao['id'], Notificacao>
    responsaveis: Record<Responsavel['id'], Responsavel>
    tios: Record<Tio['id'], Tio>
}

export type UserCompleted = ParsedToken & {
    familia: string,
    cpf: string,
    email: string,
    name: string,
    picture: string,
    user_id: string,
    token: string
}

export type CelulasModel = {
    id: number,
    celula: string,
    lider: string,
    rede: string
}
