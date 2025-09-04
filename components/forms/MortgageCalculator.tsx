'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '../../lib/utils/formatters';
import { validateMortgageCalculatorForm } from '../../lib/utils/validators';
import type { Locale } from '../../lib/types/property';

interface MortgageData {
  propertyValue: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

interface MortgageCalculatorProps {
  locale?: Locale;
  className?: string;
  onCalculate?: (data: MortgageData) => void;
}

// Hook personalizado para calculadora de financiamento
function useMortgageCalculator() {
  const [data, setData] = useState<MortgageData>({
    propertyValue: 0,
    downPayment: 0,
    loanTerm: 30,
    interestRate: 5.5,
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculate = (values: Partial<MortgageData>) => {
    // Converte para o formato esperado pela validação
    const validationData = {
      propertyPrice: String(values.propertyValue || 0),
      downPayment: String(values.downPayment || 0),
      loanTerm: String(values.loanTerm || 30),
      interestRate: String(values.interestRate || 5.5)
    };

    const validation = validateMortgageCalculatorForm(validationData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    const propertyValue = values.propertyValue || 0;
    const downPayment = values.downPayment || 0;
    const loanTerm = values.loanTerm || 30;
    const interestRate = values.interestRate || 5.5;

    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    const newData = {
      ...values,
      propertyValue,
      downPayment,
      loanTerm,
      interestRate,
      monthlyPayment,
      totalInterest,
      totalAmount
    } as MortgageData;

    setData(newData);
    return newData;
  };

  return {
    data,
    errors,
    calculate,
    setData
  };
}

export function MortgageCalculator({ 
  locale = 'pt',
  className = '',
  onCalculate 
}: MortgageCalculatorProps) {
  const { data, errors, calculate } = useMortgageCalculator();
  
  const [formData, setFormData] = useState({
    propertyValue: 500000,
    downPayment: 100000,
    loanTerm: 30,
    interestRate: 5.5
  });

  const handleInputChange = (field: string, value: number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
  };

  const handleCalculate = () => {
    const result = calculate(formData);
    if (result && onCalculate) {
      onCalculate(result);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [formData]);

  const labels = locale === 'en' ? {
    title: 'Mortgage Calculator',
    propertyValue: 'Property Value',
    downPayment: 'Down Payment',
    loanTerm: 'Loan Term (years)',
    interestRate: 'Interest Rate (%)',
    monthlyPayment: 'Monthly Payment',
    totalInterest: 'Total Interest',
    totalAmount: 'Total Amount',
    calculate: 'Calculate'
  } : {
    title: 'Calculadora de Financiamento',
    propertyValue: 'Valor do Imóvel',
    downPayment: 'Entrada',
    loanTerm: 'Prazo (anos)',
    interestRate: 'Taxa de Juros (%)',
    monthlyPayment: 'Parcela Mensal',
    totalInterest: 'Juros Totais',
    totalAmount: 'Valor Total',
    calculate: 'Calcular'
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{labels.title}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.propertyValue}
          </label>
          <input
            type="number"
            value={formData.propertyValue}
            onChange={(e) => handleInputChange('propertyValue', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.propertyValue && (
            <span className="text-red-500 text-sm">{errors.propertyValue}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.downPayment}
          </label>
          <input
            type="number"
            value={formData.downPayment}
            onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.downPayment && (
            <span className="text-red-500 text-sm">{errors.downPayment}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.loanTerm}
            </label>
            <input
              type="number"
              value={formData.loanTerm}
              onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.interestRate}
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.interestRate}
              onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{labels.monthlyPayment}:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(data.monthlyPayment, locale)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">{labels.totalInterest}:</span>
            <span className="text-lg text-gray-900">
              {formatPrice(data.totalInterest, locale)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">{labels.totalAmount}:</span>
            <span className="text-lg text-gray-900">
              {formatPrice(data.totalAmount, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}