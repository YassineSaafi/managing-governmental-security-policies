export interface Policy {
    _id?: string; 
    title: string; 
    content: string; 
    effectiveDate: Date;
    version: number; 
    status: 'active' | 'inactive'; 
  }
  