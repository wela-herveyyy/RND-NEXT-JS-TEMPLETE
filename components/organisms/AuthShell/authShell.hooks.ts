type AuthShellContent = {
  title: string;
  description: string;
};

export function getAuthShellContent(title: string, description: string): AuthShellContent {
  return { title, description };
}
