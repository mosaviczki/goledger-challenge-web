"use client";

export default function PlaylistId() {
  const play = [
    {
      id: 0,
      title: "Die with a Smile",
      artist: "Lady Gaga, Bruno Mars",
      album: "Die with a Smile",
      add: "1 de set. 2024",
    },
    {
      id: 1,
      title: "I Wanna Be Your",
      artist: "Artic Monkeys",
      album: "Am",
      add: "11 de ago. 2024",
    },
    {
      id: 2,
      title: "Die with a Smile",
      artist: "Lady Gaga, Bruno Mars",
      album: "Die with a Smile",
      add: "1 de set. 2024",
    },
    {
      id: 3,
      title: "I Wanna Be Your",
      artist: "Artic Monkeys",
      album: "Am",
      add: "11 de ago. 2024",
    },
    {
      id: 4,
      title: "Die with a Smile",
      artist: "Lady Gaga, Bruno Mars",
      album: "Die with a Smile",
      add: "1 de set. 2024",
    },
  ];
  return (
    <div>
      <h1>Romance</h1>
      {play.map((item, idx) => (
        <table key={idx}>
          <td>
            <tr>
              <div>
                <div></div>
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.artist}</p>
                </div>
              </div>
            </tr>
            <tr>{item.album}</tr>
            <td>{item.add}</td>
          </td>
        </table>
      ))}
    </div>
  );
}
