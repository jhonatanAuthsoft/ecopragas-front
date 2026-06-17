export function isValidCPF(raw: string): boolean {
  const cpf = raw.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigit = (base: string, factor: number) => {
    let sum = 0;

    for (let index = 0; index < base.length; index++) {
      sum += Number(base[index]) * (factor - index);
    }

    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  const digit1 = calcDigit(cpf.slice(0, 9), 10);
  const digit2 = calcDigit(cpf.slice(0, 10), 11);

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
}
