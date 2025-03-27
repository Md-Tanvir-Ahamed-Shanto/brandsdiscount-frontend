/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface IProps {
  form: any;
  name: string;
  placeholder?: any;
  label?: string;
  labelClass?: string;
  formItemClassName?: string;
  className?: string;
  defaultValue?: string;
  type?: any | "text";
  value?: string;
  disabled?: boolean;
}

const FormInput: FC<IProps> = ({ form, name, placeholder, label, formItemClassName, labelClass, className, defaultValue, type, value, disabled }) => {
  const [pin, setPin] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", formItemClassName)}>
          <FormLabel className={cn(labelClass, "text-sm font-medium")}>
            {label ? label : ""}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={type === 'password' ? pin ? 'text' : 'password' : type}
                value={value ?? field.value ?? defaultValue ?? ""}
                placeholder={placeholder}
                className={`placeholder-third-800 bg-first-300 focus-visible:ring-transparent text-white border border-white rounded-[8px] py-4 ${className}`}
                disabled={disabled}
              />
              {type === 'password' && <div
                onClick={() => setPin(!pin)}
                className="absolute top-3 right-4 text-[14px] cursor-pointer"
              >
                {pin ? <FaEye /> : <FaEyeSlash />}
              </div>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
