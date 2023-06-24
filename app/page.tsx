import Nav from "../components/Nav";
export default function Home() {
  return (
    <main>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9rPlvAdkzmyTmkt6YSmp-LJYn4_RGq30&libraries=geometry"
        async
        defer
      ></script>
      Home
      <Nav />
    </main>
  );
}
