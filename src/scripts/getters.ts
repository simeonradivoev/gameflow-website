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
)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .catch((e) => {
    console.error(e);
    return { stargazers_count: 0 };
  });

export const releaseData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/releases/latest",
  githubHeaders,
)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .catch((e) => {
    console.error(e);
    return { tag_name: "unknown" };
  });

export const appContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-deck/contributors",
  githubHeaders,
)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .catch((e) => {
    console.error(e);
    return [];
  });

export const storeContributorsData = await fetch(
  "https://api.github.com/repos/simeonradivoev/gameflow-store/contributors",
  githubHeaders,
)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  })
  .catch((e) => {
    console.error(e);
    return [];
  });

export const emulators = await fetch(
  "https://cdn.jsdelivr.net/npm/@simeonradivoev/gameflow-store@latest/manifests/emulators.json",
)
  .then((res) => res.json())
  .then((d) => d.emulators as any[])
  .catch((e) => {
    console.error(e);
    return [] as any[];
  });
