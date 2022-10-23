import { ParentComponent, Show } from "solid-js";
import { useDb } from "./db";

const NavLink: ParentComponent<{
  page?: string;
  to: string;
}> = (props) => {
  const path = `/paas-price-estimator/${props.to}`;
  const [_db, _setDb, stringDb] = useDb();
  return (
    <Show when={props.to !== props.page} fallback={<span class="text-slate-500">{props.children}</span>}>
      <a href={`${path}#${btoa(stringDb())}`}>{props.children}</a>
    </Show>
  );
}

export const Layout: ParentComponent<{
  page?: string
}> = (props) => {
  return (
    <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
      <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
      <div class="text-center">
        <NavLink {...props} to="">main</NavLink> / 
        <NavLink {...props} to="tables">tables</NavLink> / 
        <NavLink {...props} to="about">about</NavLink>
      </div>
      {props.children}
      <div class="text-center text-slate-600 mt-12">
        Copyright 2022 Luke Turner -- MIT Licensed
      </div>
      <div class="text-center text-slate-600">
        <a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a>
      </div>
    </div>
  );
}

