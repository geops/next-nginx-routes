import { useRouter } from "next/router";

export default function Foo() {
  const router = useRouter();
  return (
    <dl>
      <dt>Foo</dt>
      <dd>{router.query.foo}</dd>
      <dt>Bar</dt>
      <dd>{router.query.bar}</dd>
      <dt>ID</dt>
      <dd>{router.query.id}</dd>
    </dl>
  );
}
