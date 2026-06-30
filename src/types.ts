export interface DbConfig {
  host: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
  adminUser: string;
  adminPass: string;
  installedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  type?: 'article' | 'news';
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  categoryId: number;
  imageUrl: string;
  createdAt: string;
  views: number;
  type?: 'article' | 'news';
  isSpecial?: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  authorName: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
}

export interface ServiceRequest {
  id: number;
  fullName: string;
  companyName?: string;
  position?: string;
  phone: string;
  email?: string;
  city?: string;
  businessType?: string;
  businessStatus?: string;
  requestSubject?: string;
  priority: 'immediate' | 'week' | 'month' | 'evaluating';
  annualTurnover?: string;
  complexity: 'simple' | 'medium' | 'complex' | 'unknown';
  description: string;
  contactMethod: 'phone' | 'email' | 'bale';
  createdAt: string;
  status: 'pending' | 'reviewed' | 'completed';
}

export interface ContactMessage {
  id: number;
  fullName: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
