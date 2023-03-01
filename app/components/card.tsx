import clsx from "clsx";

type Status = "available" | "in-post" | "not-available";

const colors = {
  available: "bg-green",
  "in-post": "bg-yellow",
  "not-available": "bg-red",
};

type Props = {
  status: Status;
};

export function CardStatus(props: Props) {
  return (
    <article className="from-neutral-900 to-black bg-gradient-to-b px-4 py-2">
      <div className="flex items-center gap-4">
        <span
          className={clsx("block rounded-full w-2 h-2", colors[props.status])}
        />
        <p className="text-xs font-100 capitalize">status: {props.status}</p>
      </div>
    </article>
  );
}

export function CardCurrentJob() {
  return (
    <article className="from-neutral-900 to-black bg-gradient-to-b px-4 py-2">
      <div className="flex items-center gap-4"></div>
    </article>
  );
}
