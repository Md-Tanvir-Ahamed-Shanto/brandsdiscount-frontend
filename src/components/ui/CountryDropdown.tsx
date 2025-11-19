"use client"

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COUNTRY_OPTIONS = [
  { value: 'australia', label: 'Australia' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'canada', label: 'Canada' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'italy', label: 'Italy' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'spain', label: 'Spain' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'united-states', label: 'United States' }
];

interface CountryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CountryDropdown = ({ value, onChange, placeholder = 'Select country' }: CountryDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {COUNTRY_OPTIONS.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};