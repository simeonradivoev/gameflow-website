const githubHeaders = import.meta.env.GITHUB_TOKEN
  ? {
      headers: {
        Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
      },
    }
  : {};

export const repoData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck",
  githubHeaders,
).then((res) => res.json());

export const releaseData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/releases/latest",
  githubHeaders,
).then((res) => res.json());

export const appContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/contributors",
  githubHeaders,
).then((res) => res.json());

export const storeContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-store/contributors",
  githubHeaders,
).then((res) => res.json());

export const emulators = await fetch(
  "https://cdn.jsdelivr.net/npm/@simeonradivoev/gameflow-store@latest/manifests/emulators.json",
)
  .then((res) => res.json())
  .then((d) => d.emulators as any[]);
