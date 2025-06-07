'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type SearchResult = [string, string, string];
type NewsEntry = [string, string, string];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get("search") || "";

  const [title, setTitle] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [news, setNews] = useState<NewsEntry[]>([]);

  useEffect(() => {
    if (queryTitle.trim() !== "") {
      setTitle(queryTitle);

      fetch("/sites.json")
        .then((res) => res.json())
        .then((data) => {
          const links: SearchResult[] = Object.entries(data).map(
            ([name, content]: any) => {
              const joinedTitle = queryTitle.split(" ").join(content.separator);
              const url = content.url.replace("|TITLEQUERYSPACE|", joinedTitle);
              return [url, name, content.tooltip];
            }
          );
          setResults(links);
        });
    } else {
      setResults([]);
    }
  }, [queryTitle]);

  useEffect(() => {
    fetch("/news.json")
      .then(res => res.json())
      .then(data => {
        const entries: NewsEntry[] = Object.entries(data).map(
          ([date, content]: any) => [date, content.text, content.type]
        );
        setNews(entries);
      });
  }, []);

  useEffect(() => {
    if (title.trim() === "") {
      setResults([]);
      return;
    }

    fetch("/sites.json")
      .then((res) => res.json())
      .then((data) => {
        const links: SearchResult[] = Object.entries(data).map(
          ([name, content]: any) => {
            const joinedTitle = title.split(" ").join(content.separator);
            const url = content.url.replace("|TITLEQUERYSPACE|", joinedTitle);
            return [url, name, content.tooltip];
          }
        );
        setResults(links);
      });
  }, [title]);

  return (
    <div className="container">
      <main id="searching_area">
        <h1>Multibuscador</h1>
        <div id="search_form">
          <label htmlFor="title">Título del libro:&nbsp;</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setTitle(newTitle);
              router.push(`/?search=${encodeURIComponent(newTitle)}`);
            }}
          />
        </div>
          
        {results.length > 0 && (
          <ul id="results_list">
            {results.map((search, index) => (
              <li key={index}>
                <a href={search[0]}>{title}</a> en <b>{search[1]}</b>
                {search[2] !== "" && (
                  <span title={search[2]} className="more_info">
                    &nbsp;ⓘ
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <br />
        <footer id="additional_info">
          <p>
            Sitios buenos sin URL de búsqueda:{" "}
            <a href="https://freeditorial.com">
              <b>freeditorial.com</b>
            </a>
            ,{" "}
            <a href="https://pdfcoffee.com">
              <b>pdfcoffee.com</b>
            </a>
          </p>
        </footer>
      </main>
      
      <aside id="news_area">
        <h2>Lo nuevo</h2>
        <ul>
          {news.map((entry, index) => (
            <li key={index}>
              <span className={entry[2]}>{entry[0]}</span> - {entry[1]}.
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
