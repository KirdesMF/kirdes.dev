import clsx from "clsx";
import { ElasticGrid } from "~/components/canvas/elastic-grid";

// TODO: move this to css
const beforeStyles = [
  "before:pointer-events-none",
  "before:absolute",
  "before:inset-0",
  "before:z-10",
  "before:from-black",
  "before:via-transparent",
  "before:to-transparent",
  "before:bg-gradient-to-t",
  "before:content-none",
];

export default function Index() {
  return (
    <main>
      <section className="relative flex items-center justify-center px-4 pt-[70px]">
        <div
          role="presentation"
          aria-hidden
          className={clsx(...beforeStyles, "absolute inset-0")}
        >
          <ElasticGrid />
        </div>
        <h1 className="mb-[calc(9rem+70px)] mt-36 max-w-[18ch] text-center text-4xl font-900 color-neutral md:mb-[calc(12rem+70px)] md:mt-48 md:text-6xl">
          Creating digital experiences with passion and purpose.
        </h1>
      </section>

      {/* <section className="px-8">
        <div className="grid ma-auto mb-36 max-w-[min(100%,60ch)]">
          <h2 className="mb-4 text-sm color-neutral">
            Frontend developer with 5+ years of experience in building web.
          </h2>

          <p className="text-sm font-200 color-neutral">
            Passionate about bringing designs to life, I love crafting beautiful
            and intuitive user interfaces. With a keen eye for detail and a
            focus on user experience, I try to bring my creativity and technical
            skills to every project to deliver engaging and seamless digital
            experiences.
          </p>
        </div>
      </section> */}

      <section className="mb-36 px-8">
        <div className="custom-grid ma-auto max-w-[min(100%,60rem)]">
          <div
            role="separator"
            aria-hidden
            aria-orientation="horizontal"
            className="radial-gradient grid-col-[1/-1] grid-row-[2]"
          />

          <div
            role="separator"
            aria-hidden
            aria-orientation="vertical"
            className="radial-gradient grid-col-[2] grid-row-[1/-1]"
          />

          <div className="grid-col-[3] grid-row-[3] flex flex-col items-center gap-8 px-4 py-24"></div>

          <div
            role="separator"
            aria-hidden
            aria-orientation="horizontal"
            className="radial-gradient grid-col-[1/-1] grid-row-[4]"
          />

          <div
            role="separator"
            aria-hidden
            aria-orientation="vertical"
            className="radial-gradient grid-col-[4] grid-row-[1/-1]"
          />
        </div>
      </section>
    </main>
  );
}
