const LANGUAGE_COLORS : Readonly<Record<string, string>> = {
  "TypeScript": "#3178c6",
  "JavaScript": "#f1e05a",
  "Java": "#b07219",
  "Python": "#3572A5",
  "HTML": "#e34c26",
  "CSS": "#663399",
  "SCSS": "#c6538c",
  "Shell": "#89e051",
  "C": "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "Kotlin": "#A97BFF",
  "Ruby": "#701516",
  "PHP": "#4F5D95",
  "Swift": "#F05138",
  "Dockerfile": "#384d54",
  "Makefile": "#427819",
  "Lua": "#000080",
  "Vue": "#41b883",
  "Batchfile": "#C1F12E",
  "PowerShell": "#012456",
  "Groovy": "#4298b8",
  "Scala": "#c22d40",
  "Dart": "#00B4AB",
  "Jupyter Notebook": "#DA5B0B",
};

const FALLBACK_COLORS : readonly string[] = [
  "#6e7781", "#8250df", "#bf3989", "#1a7f37", "#9a6700", "#0969da", "#cf222e",
];

const DEFAULT_COLOR = "#6e7781";

export function getLanguageColor(language : string, index : number = 0) : string {
  return LANGUAGE_COLORS[language]
    ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]
    ?? DEFAULT_COLOR;
}
