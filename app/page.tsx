import NewsCardGenerator from "./Components/NewsCardGenerator";

export default function Home() {
  return <NewsCardGenerator category="general" autoPost={true} />;
}
