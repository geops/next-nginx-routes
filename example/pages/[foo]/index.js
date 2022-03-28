import { useRouter } from "next/router";

export default function Foo() {
  const router = useRouter();
  return `Foo: ${router.query.foo}`;
}
