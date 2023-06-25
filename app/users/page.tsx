import EmptyPanel from "./components/EmptyPanel";

type Props = {};

const UserPage = (props: Props) => {
  return (
    <main className="hidden lg:block lg:pl-80 min-h-screen">
      <EmptyPanel />
    </main>
  );
};

export default UserPage;
