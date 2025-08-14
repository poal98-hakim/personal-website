export type ClassValue = string | number | boolean | undefined | null;
export type ClassArray = ClassValue[];
export type ClassDictionary = Record<string, unknown>;
export type ClassInput = ClassValue | ClassDictionary | ClassArray;
