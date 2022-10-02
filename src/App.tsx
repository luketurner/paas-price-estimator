import { Component, createSignal, Match, Switch } from 'solid-js';
import { AboutPage } from './AboutPage';
import { AppDBProvider } from './db';
import { MainPage } from './MainPage';

export const App: Component = () => {

  const [page, setPage] = createSignal<'main' | 'about'>('main');

  return (
    <AppDBProvider>
      <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
        <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
        <div class="text-center">
          <button disabled={page() === 'main'} classList={{'text-slate-500': page() === 'main'}} onClick={() => setPage('main')}>main</button> / 
          <button disabled={page() === 'about'} classList={{'text-slate-500': page() === 'about'}} onClick={() => setPage('about')}>about</button>
        </div>
        <Switch>
          <Match when={page() === 'about'}>
            <AboutPage />
          </Match>
          <Match when={page() === 'main'}>
            <MainPage />
          </Match>
        </Switch>
        <div class="text-center text-slate-600">
          Copyright 2022 Luke Turner -- MIT Licensed
        </div>
        <div class="text-center text-slate-600">
          <a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a>
        </div>
      </div>
    </AppDBProvider>
  );
};
