export const repoData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck",
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  },
).then((res) => res.json());

export const releaseData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/releases/latest",
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  },
).then((res) => res.json());

export const appContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/contributors",
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  },
).then((res) => res.json());

export const storeContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-store/contributors",
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  },
).then((res) => res.json());

export const emulators = await fetch(
  "https://cdn.jsdelivr.net/npm/@simeonradivoev/gameflow-store@latest/manifests/emulators.json",
)
  .then((res) => res.json())
  .then((d) => d.emulators as any[]);
