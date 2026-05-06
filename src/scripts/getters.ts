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

async function getTotalDownloads(owner: string, repo: string): Promise<number> {
  let totalDownloads = 0;
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...githubHeaders.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          repository(owner: "${owner}", name: "${repo}") {
            releases(first: 100${cursor ? `, after: "${cursor}"` : ""}) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                releaseAssets(first: 100) {
                  nodes {
                    downloadCount
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const json: any = await res.json();

    if (json.errors) {
      throw new Error(
        `GraphQL error: ${json.errors.map((e: any) => e.message).join(", ")}`,
      );
    }

    const releases = json.data?.repository?.releases;

    if (!releases) {
      throw new Error(
        `Repository ${owner}/${repo} not found or not accessible`,
      );
    }

    for (const release of releases.nodes) {
      for (const asset of release.releaseAssets.nodes) {
        totalDownloads += asset.downloadCount;
      }
    }

    hasNextPage = releases.pageInfo.hasNextPage;
    cursor = releases.pageInfo.endCursor;
  }

  return totalDownloads;
}

export const totalDownloads = await getTotalDownloads(
  "simeonradivoev",
  "gameflow-deck",
).catch((e) => {
  console.error(e);
  return 0;
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
