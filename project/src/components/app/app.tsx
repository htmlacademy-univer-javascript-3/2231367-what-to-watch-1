import MainPage from "../../pages/main-page/main-page";

type AppProps = {
  title: string,
  genre: string,
  year: number
}

function App(props: AppProps): JSX.Element {
  return <MainPage title={props.title}
                   genre={props.genre}
                   year={props.year}
  />;
}

export default App;
