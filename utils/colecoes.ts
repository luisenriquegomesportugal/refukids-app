type ColecoesType = { label: string, value: any }[]
type ColecoesArrayType = [string, ...string[]]

export const sexoOptions = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
] as ColecoesType

export const sexos = sexoOptions.map(sexo => sexo.label) as ColecoesArrayType

export const parentescosOptions = [
    { label: "Pai", value: "Pai" },
    { label: "Mãe", value: "Mãe" },
    { label: "Irmão", value: "Irmão" },
    { label: "Irmã", value: "Irmã" },
    { label: "Avô", value: "Avô" },
    { label: "Avó", value: "Avó" },
    { label: "Tio", value: "Tio" },
    { label: "Tia", value: "Tia" },
    { label: "Líder", value: "Líder" },
    { label: "Amigo", value: "Amigo" },
    { label: "Amiga", value: "Amiga" },
    { label: "Supervisor", value: "Supervisor" },
    { label: "Supervisora", value: "Supervisora" }
] as ColecoesType

export const parentescos = parentescosOptions.map(parentesco => parentesco.label) as ColecoesArrayType

export const simNaoOptions = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
] as ColecoesType

export const simNaos = simNaoOptions.map(op => op.label) as ColecoesArrayType