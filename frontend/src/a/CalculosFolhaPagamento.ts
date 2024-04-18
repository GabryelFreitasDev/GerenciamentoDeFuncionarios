
class Calculos {
    static CalculaINSS(salario: number) {
        let desconto: number = 0;

        if (salario >= 5839.45)
            desconto = 642.34;

        if (salario >= 2919.73 && salario <= 5839.45)
            desconto = salario * 0.11;

        if (salario >= 1751.82 && salario <= 2919.72)
            desconto = salario * 0.09;

        if (salario <= 1751.81)
            desconto = salario * 0.08;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaFGTS(salario: number) {
        let desconto: number = 0;

        if (salario > 0)
            desconto = salario * 0.08;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaIRRF(salario: number) {
        let desconto: number = 0;

        if (salario >= 4664.68)
            desconto = salario * 0.275;

        if (salario >= 3751.06 && salario <= 4664.68)
            desconto = salario * 0.225;

        if (salario >= 2826.66 && salario <= 3751.05)
            desconto = salario * 0.15;

        if (salario >= 1903.99 && salario < 2826.65)
            desconto = salario * 0.075;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaSalarioPorHora(salario: number, totalHorasTrabalhadas: number) {
        let salarioPorHora: number = 0;

        if (salario > 0 && totalHorasTrabalhadas > 0)
            salarioPorHora = salario / totalHorasTrabalhadas;

        return parseFloat(salarioPorHora.toString()).toFixed(2).toString();
    }

    static CalculaValorDescontoHorasAusentes(salario: number, totalHorasTrabalhadas: number, totalHorasAusentes: number) {
        let desconto: number = 0;
        const salarioPorHora = parseFloat(Calculos.CalculaSalarioPorHora(salario, totalHorasTrabalhadas));

        if (salarioPorHora > 0 && totalHorasAusentes > 0)
            desconto = salarioPorHora * totalHorasAusentes;

        return parseFloat(desconto.toString()).toFixed(2).toString();
    }

    static CalculaValorTotalDescontos(inss: number, irrf: number, valorHorasAusentes: number) {
        let totalDescontos: number = 0;
        if (inss && !isNaN(inss))
            totalDescontos += inss;
        if (irrf && !isNaN(irrf))
            totalDescontos += irrf;
        if (valorHorasAusentes && !isNaN(valorHorasAusentes))
            totalDescontos += valorHorasAusentes;

        return parseFloat(totalDescontos.toString()).toFixed(2);
    }

    // static CalculaValeTransporte(salario: number){
    //     let desconto: number = 0;
        
    // }

    static CalculaValorAdicionalHorasExtra(salario: number, totalHorasTrabalhadas: number, totalHorasExtra: number) {
        let acrescimo: number = 0;
        const salarioPorHora = parseFloat(Calculos.CalculaSalarioPorHora(salario, totalHorasTrabalhadas));

        if (salarioPorHora > 0 && totalHorasExtra > 0)
            acrescimo = salarioPorHora * totalHorasExtra;

        return parseFloat(acrescimo.toString()).toFixed(2).toString();
    }

    static CalculaValorTotalAdicionais(periculosidade: number, noturno: number, insalubridade: number, valorHorasExtra: number) {
        let acrescimo: number = 0;

        if (periculosidade && !isNaN(periculosidade))
            acrescimo += periculosidade;
        if (noturno && !isNaN(noturno))
            acrescimo += noturno;
        if (insalubridade && !isNaN(insalubridade))
            acrescimo += insalubridade;
        if (valorHorasExtra && !isNaN(valorHorasExtra))
            acrescimo += valorHorasExtra;

        return parseFloat(acrescimo.toString()).toFixed(2).toString();
    }
}

export { Calculos }
