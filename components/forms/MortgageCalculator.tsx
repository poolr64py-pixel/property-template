'use client';

import { useState, useEffect } from 'react';
import { useMortgageCalculator } from '../../lib/hooks/useProperty';
import { formatPrice } from '../../lib/utils/formatters';
import { validateMortgageCalculatorForm } from '../../lib/utils/validators';
import type { Locale } from '../../lib/types/property';

interface MortgageCalculatorProps {
  locale: Locale;
  className?: string;
  initialPrice?: number;
  currency?: string;
}

export function MortgageCalculator({ 
  locale = 'pt', 
  className = '',
  initialPrice,
  currency = 'EUR'
}: MortgageCalculatorProps) {
  const {
    principal,
    setPrincipal,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    calculateMortgage,
    currency: configCurrency
  } = useMortgageCalculator();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const actualCurrency = configCurrency || currency;

  // Configurar preço inicial
  useEffect(() => {
    if (initialPrice && initialPrice !== principal) {
      setPrincipal(initialPrice);
    }
  }, [initialPrice, principal, setPrincipal]);

  const translations = {
    pt: {
      title: 'Calculadora de Financiamento',
      propertyPrice: 'Preço do Imóvel',
      downPayment: 'Entrada (%)',
      interestRate: 'Taxa de Juros (% ao ano)',
      loanTerm: 'Prazo (anos)',
      calculate: 'Calcular',
      calculating: 'Calculando...',
      monthlyPayment: 'Prestação Mensal',
      totalAmount: 'Valor Total a Pagar',
      totalInterest: 'Total de Juros',
      loanAmount: 'Valor do Empréstimo',
      downPaymentAmount: 'Valor da Entrada',
      summary: 'Resumo do Financiamento',
      disclaimer: 'Os valores são apenas estimativos. Consulte seu banco para condições reais.'
    },
    en: {
      title: 'Mortgage Calculator',
      propertyPrice: 'Property Price',
      downPayment: 'Down Payment (%)',
      interestRate: 'Interest Rate (% per year)',
      loanTerm: 'Loan Term (years)',
      calculate: 'Calculate',
      calculating: 'Calculating...',
      monthlyPayment: 'Monthly Payment',
      totalAmount: 'Total Amount to Pay',
      totalInterest: 'Total Interest',
      loanAmount: 'Loan Amount',
      downPaymentAmount: 'Down Payment Amount',
      summary: 'Financing Summary',
      disclaimer: 'Values are estimates only. Consult your bank for actual conditions.'
    },
    es: {
      title: 'Calculadora de Hipoteca',
      propertyPrice: 'Precio de la Propiedad',
      downPayment: 'Entrada (%)',
      interestRate: 'Tasa de Interés (% anual)',
      loanTerm: 'Plazo (años)',
      calculate: 'Calcular',
      calculating: 'Calculando...',
      monthlyPayment: 'Pago Mensual',
      totalAmount: 'Cantidad Total a Pagar',
      totalInterest: 'Interés Total',
      loanAmount: 'Monto del Préstamo',
      downPaymentAmount: 'Monto de la Entrada',
      summary: 'Resumen del Financiamiento',
      disclaimer: 'Los valores son solo estimados. Consulte su banco para condiciones reales.'
    },
    de: {
      title: 'Hypothekenrechner',
      propertyPrice: 'Immobilienpreis',
      downPayment: 'Anzahlung (%)',
      interestRate: 'Zinssatz (% pro Jahr)',
      loanTerm: 'Laufzeit (Jahre)',
      calculate: 'Berechnen',
      calculating: 'Berechnung...',
      monthlyPayment: 'Monatliche Rate',
      totalAmount: 'Gesamtbetrag zu zahlen',
      totalInterest: 'Gesamtzinsen',
      loanAmount: 'Darlehensbetrag',
      downPaymentAmount: 'Anzahlungsbetrag',
      summary: 'Finanzierungsübersicht',
      disclaimer: 'Die Werte sind nur Schätzungen. Wenden Sie sich an Ihre Bank für tatsächliche Bedingungen.'
    }
  };

  const t = translations[locale];

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Validar formulário
    const validation = validateMortgageCalculatorForm({
      propertyPrice: principal.toString(),
      downPayment: downPayment.toString(),
      interestRate: interestRate.toString(),
      loanTerm: loanTerm.toString()
    }, locale);

    setErrors(validation.errors);

    if (validation.isValid) {
      // Simular delay de cálculo
      setTimeout(() => {
        const calculationResults = calculateMortgage();
        setResults(calculationResults);
        setIsCalculating(false);
      }, 800);
    } else {
      setIsCalculating(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t.title}
      </h3>

      <div className="space-y-4">
        {/* Preço do Imóvel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.propertyPrice}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">{actualCurrency}</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className={`
                w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.propertyPrice ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="850000"
            />
          </div>
          {errors.propertyPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.propertyPrice}</p>
          )}
        </div>

        {/* Entrada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.downPayment}
          </label>
          <div className="relative">
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className={`
                w-full pr-8 pl-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.downPayment ? 'border-red-500' : 'border-gray-300'}
              `}
              min="0"
              max="90"
              placeholder="20"
            />
            <span className="absolute right-3 top-3 text-gray-500">%</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Valor: {formatPrice(principal * downPayment / 100, actualCurrency, locale)}
          </div>
          {errors.downPayment && (
            <p className="text-red-500 text-xs mt-1">{errors.downPayment}</p>
          )}
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.interestRate}
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className={`
                w-full pr-8 pl-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.interestRate ? 'border-red-500' : 'border-gray-300'}
              `}
              min="0.1"
              max="20"
              placeholder="3.5"
            />
            <span className="absolute right-3 top-3 text-gray-500">%</span>
          </div>
          {errors.interestRate && (
            <p className="text-red-500 text-xs mt-1">{errors.interestRate}</p>
          )}
        </div>

        {/* Prazo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.loanTerm}
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className={`
              w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.loanTerm ? 'border-red-500' : 'border-gray-300'}
            `}
            min="1"
            max="50"
            placeholder="30"
          />
          {errors.loanTerm && (
            <p className="text-red-500 text-xs mt-1">{errors.loanTerm}</p>
          )}
        </div>

        {/* Botão Calcular */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className={`
            w-full py-3 px-4 rounded-md font-medium transition-colors
            ${isCalculating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            } text-white
          `}
        >
          {isCalculating ? t.calculating : t.calculate}
        </button>
      </div>

      {/* Resultados */}
      {results && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {t.summary}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prestação Mensal */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="text-sm font-medium text-gray-600 mb-1">
                {t.monthlyPayment}
              </h5>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(results.monthlyPayment, actualCurrency, locale)}
              </p>
            </div>

            {/* Valor do Empréstimo */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="text-sm font-medium text-gray-600 mb-1">
                {t.loanAmount}
              </h5>
              <p className="text-xl font-semibold text-gray-900">
                {formatPrice(results.loanAmount, actualCurrency, locale)}
              </p>
            </div>

            {/* Valor da Entrada */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="text-sm font-medium text-gray-600 mb-1">
                {t.downPaymentAmount}
              </h5>
              <p className="text-xl font-semibold text-gray-900">
                {formatPrice(results.downPaymentAmount, actualCurrency, locale)}
              </p>
            </div>

            {/* Total de Juros */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="text-sm font-medium text-gray-600 mb-1">
                {t.totalInterest}
              </h5>
              <p className="text-xl font-semibold text-orange-600">
                {formatPrice(results.totalInterest, actualCurrency, locale)}
              </p>
            </div>
          </div>

          {/* Valor Total */}
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold text-gray-900">
                {t.totalAmount}
              </h5>
              <p className="text-2xl font-bold text-blue-700">
                {formatPrice(results.totalAmount, actualCurrency, locale)}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              ⚠️ {t.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}