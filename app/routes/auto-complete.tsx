import React, { useState } from 'react';
import { countries, Country } from '~/constants';

export default function Route() {
  const [searchResults, setSearchResults] = useState<Country[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    const delay = searchText.length * 500;
    const response = await new Promise<Country[]>((resolve) => {
      setTimeout(() => {
        const filtered = countries.filter((country) =>
          country.name.toLowerCase().includes(searchText.toLowerCase())
        );
        resolve(filtered);
      }, delay);
    });
    // ここでレースコンディションが発生する可能性がある
    // 古い検索結果が新しい検索結果を上書きしてしまう可能性がある
    setSearchResults(response);
  };

  return (
    <div className="p-24">
      <p>search form by useState</p>
      <input type="text" onChange={handleSearch} />
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}
