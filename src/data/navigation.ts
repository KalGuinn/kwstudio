export interface NavLink {
  href: string;
  label: string;
  cta?: boolean;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/book', label: 'Book' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/priority', label: 'Build It Remarkable', cta: true },
  { href: '/free-guide', label: 'Free Guide' },
  { href: '/contact', label: 'Contact' },
];

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  { href: 'https://www.instagram.com/kelleewynne', label: 'Instagram', icon: 'simple-icons:instagram' },
  { href: 'https://www.youtube.com/c/kelleewynne', label: 'YouTube', icon: 'simple-icons:youtube' },
  { href: 'https://www.pinterest.com/kelleewynne/', label: 'Pinterest', icon: 'simple-icons:pinterest' },
];
