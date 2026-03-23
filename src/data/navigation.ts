export interface NavLink {
  href: string;
  label: string;
  cta?: boolean;
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const navLinks: NavLink[] = [
  { href: `${base}/`, label: 'Home' },
  { href: `${base}/book`, label: 'Book' },
  { href: `${base}/podcast`, label: 'Podcast' },
  { href: `${base}/priority`, label: 'Build It Remarkable', cta: true },
  { href: `${base}/free-guide`, label: 'Free Guide' },
  { href: `${base}/contact`, label: 'Contact' },
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
