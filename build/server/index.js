import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withHydrateFallbackProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, redirect, ScrollRestoration, Scripts, useNavigation, useSubmit, Link, Form, NavLink, useFetcher, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStylesHref = "/assets/app-BCbIxvWG.css";
const fakeContacts = {
  records: {},
  async getAll() {
    return Object.keys(fakeContacts.records).map((key) => fakeContacts.records[key]).sort(sortBy("-createdAt", "last"));
  },
  async get(id) {
    return fakeContacts.records[id] || null;
  },
  async create(values) {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },
  async set(id, values) {
    const contact2 = await fakeContacts.get(id);
    invariant(contact2, `No contact found for ${id}`);
    const updatedContact = { ...contact2, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },
  destroy(id) {
    delete fakeContacts.records[id];
    return null;
  }
};
async function getContacts(query) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"]
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}
async function createEmptyContact() {
  const contact2 = await fakeContacts.create({});
  return contact2;
}
async function getContact(id) {
  return fakeContacts.get(id);
}
async function updateContact(id, updates) {
  const contact2 = await fakeContacts.get(id);
  if (!contact2) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact2, ...updates });
  return contact2;
}
async function deleteContact(id) {
  fakeContacts.destroy(id);
}
[
  {
    avatar: "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
    first: "Shruti",
    last: "Kapoor",
    twitter: "@shrutikapoor08"
  },
  {
    avatar: "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
    first: "Glenn",
    last: "Reyes",
    twitter: "@glnnrys"
  },
  {
    avatar: "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
    first: "Ryan",
    last: "Florence"
  },
  {
    avatar: "https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
    first: "Oscar",
    last: "Newman",
    twitter: "@__oscarnewman"
  },
  {
    avatar: "https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
    first: "Michael",
    last: "Jackson"
  },
  {
    avatar: "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
    first: "Christopher",
    last: "Chedeau",
    twitter: "@Vjeux"
  },
  {
    avatar: "https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
    first: "Cameron",
    last: "Matheson",
    twitter: "@cmatheson"
  },
  {
    avatar: "https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
    first: "Brooks",
    last: "Lybrand",
    twitter: "@BrooksLybrand"
  },
  {
    avatar: "https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
    first: "Alex",
    last: "Anderson",
    twitter: "@ralex1993"
  },
  {
    avatar: "https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
    first: "Kent C.",
    last: "Dodds",
    twitter: "@kentcdodds"
  },
  {
    avatar: "https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg",
    first: "Nevi",
    last: "Shah",
    twitter: "@nevikashah"
  },
  {
    avatar: "https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png",
    first: "Andrew",
    last: "Petersen"
  },
  {
    avatar: "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
    first: "Scott",
    last: "Smerchek",
    twitter: "@smerchek"
  },
  {
    avatar: "https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg",
    first: "Giovanni",
    last: "Benussi",
    twitter: "@giovannibenussi"
  },
  {
    avatar: "https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg",
    first: "Igor",
    last: "Minar",
    twitter: "@IgorMinar"
  },
  {
    avatar: "https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg",
    first: "Brandon",
    last: "Kish"
  },
  {
    avatar: "https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png",
    first: "Arisa",
    last: "Fukuzaki",
    twitter: "@arisa_dev"
  },
  {
    avatar: "https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg",
    first: "Alexandra",
    last: "Spalato",
    twitter: "@alexadark"
  },
  {
    avatar: "https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg",
    first: "Cat",
    last: "Johnson"
  },
  {
    avatar: "https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg",
    first: "Ashley",
    last: "Narcisse",
    twitter: "@_darkfadr"
  },
  {
    avatar: "https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG",
    first: "Edmund",
    last: "Hung",
    twitter: "@_edmundhung"
  },
  {
    avatar: "https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg",
    first: "Clifford",
    last: "Fajardo",
    twitter: "@cliffordfajard0"
  },
  {
    avatar: "https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg",
    first: "Erick",
    last: "Tamayo",
    twitter: "@ericktamayo"
  },
  {
    avatar: "https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg",
    first: "Paul",
    last: "Bratslavsky",
    twitter: "@codingthirty"
  },
  {
    avatar: "https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg",
    first: "Pedro",
    last: "Cattori",
    twitter: "@pcattori"
  },
  {
    avatar: "https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg",
    first: "Andre",
    last: "Landgraf",
    twitter: "@AndreLandgraf94"
  },
  {
    avatar: "https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg",
    first: "Monica",
    last: "Powell",
    twitter: "@indigitalcolor"
  },
  {
    avatar: "https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg",
    first: "Brian",
    last: "Lee",
    twitter: "@brian_dlee"
  },
  {
    avatar: "https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg",
    first: "Sean",
    last: "McQuaid",
    twitter: "@SeanMcQuaidCode"
  },
  {
    avatar: "https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg",
    first: "Shane",
    last: "Walker",
    twitter: "@swalker326"
  },
  {
    avatar: "https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg",
    first: "Jon",
    last: "Jensen",
    twitter: "@jenseng"
  }
].forEach((contact2) => {
  fakeContacts.create({
    ...contact2,
    id: `${contact2.first.toLowerCase().split(" ").join("_")}-${contact2.last.toLocaleLowerCase()}`
  });
});
async function action$3() {
  const contact2 = await createEmptyContact();
  return redirect(`/contacts/${contact2.id}/edit`);
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "stylesheet",
        href: appStylesHref
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback2() {
  return /* @__PURE__ */ jsxs("div", {
    id: "loading-splash",
    children: [/* @__PURE__ */ jsx("div", {
      id: "loading-splash-spinner"
    }), /* @__PURE__ */ jsx("p", {
      children: "Loading, please wait..."
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    id: "error-page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  HydrateFallback,
  Layout,
  action: action$3,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2({
  request
}) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return {
    contacts,
    q
  };
}
const sidebar = UNSAFE_withComponentProps(function SidebarLayout({
  loaderData
}) {
  const {
    contacts,
    q
  } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      id: "sidebar",
      children: [/* @__PURE__ */ jsx("h1", {
        children: /* @__PURE__ */ jsx(Link, {
          to: "about",
          children: "React Router Contacts"
        })
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs(Form, {
          id: "search-form",
          onChange: (event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch
            });
          },
          role: "search",
          children: [/* @__PURE__ */ jsx("input", {
            "aria-label": "Search contacts",
            className: searching ? "loading" : "",
            defaultValue: q || "",
            id: "q",
            name: "q",
            placeholder: "Search",
            type: "search"
          }), /* @__PURE__ */ jsx("div", {
            "aria-hidden": true,
            hidden: !searching,
            id: "search-spinner"
          })]
        }), /* @__PURE__ */ jsx(Form, {
          method: "post",
          children: /* @__PURE__ */ jsx("button", {
            type: "submit",
            children: "New"
          })
        })]
      }), /* @__PURE__ */ jsx("nav", {
        children: contacts.length ? /* @__PURE__ */ jsx("ul", {
          children: contacts.map((contact2) => /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(NavLink, {
              className: ({
                isActive,
                isPending
              }) => isActive ? "active" : isPending ? "pending" : "",
              to: `contacts/${contact2.id}`,
              children: /* @__PURE__ */ jsxs(Link, {
                to: `contacts/${contact2.id}`,
                children: [contact2.first || contact2.last ? /* @__PURE__ */ jsxs(Fragment, {
                  children: [contact2.first, " ", contact2.last]
                }) : /* @__PURE__ */ jsx("i", {
                  children: "No Name"
                }), contact2.favorite ? /* @__PURE__ */ jsx("span", {
                  children: "★"
                }) : null]
              })
            })
          }, contact2.id))
        }) : /* @__PURE__ */ jsx("p", {
          children: /* @__PURE__ */ jsx("i", {
            children: "No contacts"
          })
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: navigation.state === "loading" && !searching ? "loading" : "",
      id: "detail",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sidebar,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("p", {
    id: "index-page",
    children: ["This is a demo for React Router.", /* @__PURE__ */ jsx("br", {}), "Check out", " ", /* @__PURE__ */ jsx("a", {
      href: "https://reactrouter.com",
      children: "the docs at reactrouter.com"
    }), "."]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
async function action$2({
  params,
  request
}) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true"
  });
}
async function loader$1({
  params
}) {
  const contact2 = await getContact(params.contactId);
  if (!contact2) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    contact: contact2
  };
}
const contact = UNSAFE_withComponentProps(function Contact({
  loaderData
}) {
  const {
    contact: contact2
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    id: "contact",
    children: [/* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("img", {
        alt: `${contact2.first} ${contact2.last} avatar`,
        src: contact2.avatar
      }, contact2.avatar)
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("h1", {
        children: [contact2.first || contact2.last ? /* @__PURE__ */ jsxs(Fragment, {
          children: [contact2.first, " ", contact2.last]
        }) : /* @__PURE__ */ jsx("i", {
          children: "No Name"
        }), /* @__PURE__ */ jsx(Favorite, {
          contact: contact2
        })]
      }), contact2.twitter ? /* @__PURE__ */ jsx("p", {
        children: /* @__PURE__ */ jsx("a", {
          href: `https://twitter.com/${contact2.twitter}`,
          children: contact2.twitter
        })
      }) : null, contact2.notes ? /* @__PURE__ */ jsx("p", {
        children: contact2.notes
      }) : null, /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(Form, {
          action: "edit",
          children: /* @__PURE__ */ jsx("button", {
            type: "submit",
            children: "Edit"
          })
        }), /* @__PURE__ */ jsx(Form, {
          action: "destroy",
          method: "post",
          onSubmit: (event) => {
            const response = confirm("Please confirm you want to delete this record.");
            if (!response) {
              event.preventDefault();
            }
          },
          children: /* @__PURE__ */ jsx("button", {
            type: "submit",
            children: "Delete"
          })
        })]
      })]
    })]
  });
});
function Favorite({
  contact: contact2
}) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData ? fetcher.formData.get("favorite") === "true" : contact2.favorite;
  return /* @__PURE__ */ jsx(fetcher.Form, {
    method: "post",
    children: /* @__PURE__ */ jsx("button", {
      "aria-label": favorite ? "Remove from favorites" : "Add to favorites",
      name: "favorite",
      value: favorite ? "false" : "true",
      children: favorite ? "★" : "☆"
    })
  });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: contact,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function action$1({
  params,
  request
}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
async function loader({
  params
}) {
  const contact2 = await getContact(params.contactId);
  if (!contact2) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return {
    contact: contact2
  };
}
const editContact = UNSAFE_withComponentProps(function EditContact({
  loaderData
}) {
  const {
    contact: contact2
  } = loaderData;
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Form, {
    id: "contact-form",
    method: "post",
    children: [/* @__PURE__ */ jsxs("p", {
      children: [/* @__PURE__ */ jsx("span", {
        children: "Name"
      }), /* @__PURE__ */ jsx("input", {
        "aria-label": "First name",
        defaultValue: contact2.first,
        name: "first",
        placeholder: "First",
        type: "text"
      }), /* @__PURE__ */ jsx("input", {
        "aria-label": "Last name",
        defaultValue: contact2.last,
        name: "last",
        placeholder: "Last",
        type: "text"
      })]
    }), /* @__PURE__ */ jsxs("label", {
      children: [/* @__PURE__ */ jsx("span", {
        children: "Twitter"
      }), /* @__PURE__ */ jsx("input", {
        defaultValue: contact2.twitter,
        name: "twitter",
        placeholder: "@jack",
        type: "text"
      })]
    }), /* @__PURE__ */ jsxs("label", {
      children: [/* @__PURE__ */ jsx("span", {
        children: "Avatar URL"
      }), /* @__PURE__ */ jsx("input", {
        "aria-label": "Avatar URL",
        defaultValue: contact2.avatar,
        name: "avatar",
        placeholder: "https://example.com/avatar.jpg",
        type: "text"
      })]
    }), /* @__PURE__ */ jsxs("label", {
      children: [/* @__PURE__ */ jsx("span", {
        children: "Notes"
      }), /* @__PURE__ */ jsx("textarea", {
        defaultValue: contact2.notes,
        name: "notes",
        rows: 6
      })]
    }), /* @__PURE__ */ jsxs("p", {
      children: [/* @__PURE__ */ jsx("button", {
        type: "submit",
        children: "Save"
      }), /* @__PURE__ */ jsx("button", {
        onClick: () => navigate(-1),
        type: "button",
        children: "Cancel"
      })]
    })]
  }, contact2.id);
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: editContact,
  loader
}, Symbol.toStringTag, { value: "Module" }));
async function action({
  params
}) {
  await deleteContact(params.contactId);
  return redirect("/");
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    id: "about",
    children: [/* @__PURE__ */ jsx(Link, {
      to: "/",
      children: "← Go to demo"
    }), /* @__PURE__ */ jsx("h1", {
      children: "About React Router Contacts"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("p", {
        children: "This is a demo application showing off some of the powerful features of React Router, including dynamic routing, nested routes, loaders, actions, and more."
      }), /* @__PURE__ */ jsx("h2", {
        children: "Features"
      }), /* @__PURE__ */ jsx("p", {
        children: "Explore the demo to see how React Router handles:"
      }), /* @__PURE__ */ jsxs("ul", {
        children: [/* @__PURE__ */ jsx("li", {
          children: "Data loading and mutations with loaders and actions"
        }), /* @__PURE__ */ jsx("li", {
          children: "Nested routing with parent/child relationships"
        }), /* @__PURE__ */ jsx("li", {
          children: "URL-based routing with dynamic segments"
        }), /* @__PURE__ */ jsx("li", {
          children: "Pending and optimistic UI"
        })]
      }), /* @__PURE__ */ jsx("h2", {
        children: "Learn More"
      }), /* @__PURE__ */ jsxs("p", {
        children: ["Check out the official documentation at", " ", /* @__PURE__ */ jsx("a", {
          href: "https://reactrouter.com",
          children: "reactrouter.com"
        }), " ", "to learn more about building great web applications with React Router."]
      })]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DPKZDA-N.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CFjx5A7A.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "layouts/sidebar": { "id": "layouts/sidebar", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sidebar-BJ5fi-nY.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "layouts/sidebar", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C4qO4xdv.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "layouts/sidebar", "path": "contacts/:contactId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-B5vc9MtT.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/edit-contact": { "id": "routes/edit-contact", "parentId": "layouts/sidebar", "path": "contacts/:contactId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/edit-contact-CTYdIswt.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/destroy-contact": { "id": "routes/destroy-contact", "parentId": "layouts/sidebar", "path": "contacts/:contactId/destroy", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/destroy-contact-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-SmUGbRZF.js", "imports": ["/assets/chunk-OIYGIGL5-BdfCQc-g.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-863ea38d.js", "version": "863ea38d", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/about"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layouts/sidebar": {
    id: "layouts/sidebar",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "layouts/sidebar",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "layouts/sidebar",
    path: "contacts/:contactId",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/edit-contact": {
    id: "routes/edit-contact",
    parentId: "layouts/sidebar",
    path: "contacts/:contactId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/destroy-contact": {
    id: "routes/destroy-contact",
    parentId: "layouts/sidebar",
    path: "contacts/:contactId/destroy",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
