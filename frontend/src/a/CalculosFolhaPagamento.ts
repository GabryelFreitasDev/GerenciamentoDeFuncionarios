
class Calculos {
    static CalculaINSS(salario: number) {
        let desconto: number = 0;

        if (salario >= 4000.04 && salario <= 7786.02)
            desconto = salario * 0.14;

        if (salario >= 2666.69 && salario <= 4000.03)
            desconto = salario * 0.12;

        if (salario >= 1412.01 && salario <= 2666.68)
            desconto = salario * 0.09;

        if (salario <= 1412)
            desconto = salario * 0.075;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaFGTS(salario: number) {
        let desconto: number = 0;
        
        if(salario > 0)
            desconto = salario * 0.08;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaIRRF(salario: number) {
        let desconto: number = 0;

        if (salario >= 4664.68)
            desconto = salario * 0.275;

        if (salario >= 3751.06 && salario <= 4664.68)
            desconto = salario * 0.225;

        if (salario >= 2826.66 && salario <= 3751.05 )
            desconto = salario * 0.15;

        if (salario <= 2112.01)
            desconto = salario * 0.075;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }
}

export { Calculos }
