import React, { useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useImmer } from 'use-immer';
import classNames from 'classnames';
import {
  ChevronDown,
  ChevronUp,
  InformationCircleOutline,
  MenuOutline,
  PlayOutline,
  QuestionMarkCircleOutline,
  ViewGridOutline,
  XOutline,
} from 'heroicons-react';
import { ExternalLink } from './ExternalLink';
import { IsomorphicLink } from './IsomorphicLink';

const LogoSvg = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
      <path d="M1021 56L968 3a10 10 0 00-15 0l-95 95a250 250 0 00-141-43c-64 0-128 25-177 74L412 257a10 10 0 000 14l341 341c2 2 4 3 7 3a11 11 0 007-3l128-128c86-87 96-220 30-318l96-96a10 10 0 000-14zM834 424l-74 74-234-234 74-75a165 165 0 01117-48 164 164 0 01166 165c0 45-17 86-49 118zM596 555a10 10 0 00-14 0l-84 84-113-113 83-84a10 10 0 000-14l-45-46a10 10 0 00-14 0l-84 84-54-54a10 10 0 00-7-3 11 11 0 00-7 3L129 540a251 251 0 00-31 318L3 953a10 10 0 000 15l53 53c2 2 5 3 7 3l7-3 96-96a250 250 0 00141 43c64 0 128-24 177-73l128-128a10 10 0 000-14l-54-54 84-84a10 10 0 000-14l-46-46zM424 835a165 165 0 01-235 0 165 165 0 01-48-118c0-44 17-85 48-117l75-74 234 234-74 75z" />
    </svg>
  );
};

export const NgPageHeader: React.FC = () => {
  const [state, update] = useImmer({ show: '', showTools: false, showApps: false });
  const handleShow = (ss) => {
    update((s) => {
      if (s.show == ss) {
        s.show = '';
      } else {
        s.show = ss;
      }
      s.showTools = s.show === 'tools';
      s.showApps = s.show === 'apps';
    });
  };
  return (
    <div className="relative bg-white">
      <div className="relative z-20 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link href={'/'} prefetch>
              <a href="/" className="flex">
                <span className="sr-only">Wener&#039; APIs</span>
                <LogoSvg className={'h-8 w-auto sm:h-10 text-blue-500'} />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => handleShow(state.show ? '' : 'tools')}
            >
              <span className="sr-only">Open menu</span>
              <MenuOutline className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <nav className="flex space-x-10">
              <div className="relative">
                {/*<!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->*/}
                <button
                  type="button"
                  className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleShow('tools')}
                >
                  <span>工具</span>
                  {!state.showTools && <ChevronDown className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />}
                  {state.showTools && <ChevronUp className="ml-2 h-5 w-5 text-gray-600 group-hover:text-gray-500" />}
                </button>
              </div>
              {/*<a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Docs
              </a>*/}
              <div className="relative">
                {/*<!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->*/}
                <button
                  type="button"
                  className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleShow('apps')}
                >
                  <span>应用</span>
                  {!state.showApps && <ChevronDown className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />}
                  {state.showApps && <ChevronUp className="ml-2 h-5 w-5 text-gray-600 group-hover:text-gray-500" />}
                </button>
              </div>
              <IsomorphicLink
                href="https://wener.me"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                博客
              </IsomorphicLink>
            </nav>
            <div className="flex items-center md:ml-12">
              <ExternalLink
                href="https://github.com/wenerme/apis"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Github
              </ExternalLink>
              {/*<a
                href="#"
                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Github
              </a>*/}
            </div>
          </div>
        </div>
      </div>

      <ToolMenu visible={state.showTools} />
      <AppMenu visible={state.showApps} />
      <MobileMenu visible={Boolean(state.show)} onClose={() => handleShow('')} />
    </div>
  );
};

const Icon: React.FC<{ className?; icon }> = ({ icon, ...rest }) => {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, rest);
  }
  if (icon) {
    return React.createElement(icon, rest);
  }
  return null;
};
const MenuPanelTransition: React.FC<{ visible; hiddenClassName? }> = ({
  visible,
  hiddenClassName = 'hidden',
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  return (
    <CSSTransition
      in={visible}
      timeout={{
        enter: 200,
        exit: 150,
      }}
      onEnter={() => setHidden(false)}
      classNames={{
        enter: 'ease-out duration-200 opacity-0',
        enterActive: 'opacity-100 translate-y-0',
        enterDone: 'opacity-100 translate-y-0',
        exit: 'ease-in duration-150',
        exitActive: 'opacity-0 -translate-y-3',
        exitDone: `opacity-0 -translate-y-3 ${hiddenClassName}`,
      }}
    >
      {React.cloneElement(React.Children.only(children) as any, {
        className: classNames('transform transition opacity-0', hidden && hiddenClassName),
      })}
    </CSSTransition>
  );
};
const ToolMenu: React.FC<{ visible }> = ({ visible }) => {
  return (
    <MenuPanelTransition visible={visible} hiddenClassName={'md:hidden'}>
      <ToolMenuContent />
    </MenuPanelTransition>
  );
};

const ToolItems = [
  {
    href: '/tools/hash',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        <path d="M57.184 29A2.996 2.996 0 0060 31c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.996 2.996 0 00-2.816 2H41a8.97 8.97 0 00-.232-2H51c.266 0 .52-.105.707-.293L55.414 21h1.77A2.996 2.996 0 0060 23c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.996 2.996 0 00-2.816 2H55a.996.996 0 00-.707.293L50.586 23H40.05A9.058 9.058 0 0037 19.522v-4.828l7.352-2.757c.389-.147.648-.52.648-.937V6.816A2.996 2.996 0 0047 4c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816v3.491l-6 2.25v-1.741A2.996 2.996 0 0039 8c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816v7.709c-.94-.334-1.947-.525-3-.525s-2.06.191-3 .525V6.816A2.996 2.996 0 0031 4c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816v12.706a9.06 9.06 0 00-2 1.834V13a.997.997 0 00-.293-.707L21 8.586v-1.77A2.996 2.996 0 0023 4c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816V9c0 .265.105.52.293.707L23 13.414V27h-8.307l-2.757-7.351A1 1 0 0011 19H6.816A2.996 2.996 0 004 17c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.996 2.996 0 002.816-2h3.491l2.25 6h-1.741A2.996 2.996 0 008 25c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.996 2.996 0 002.816-2H23v3h-1a1 1 0 00-1 1v2H6.816A2.996 2.996 0 004 33c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.996 2.996 0 002.816-2H21v2h-8a.996.996 0 00-.707.293L8.586 43h-1.77A2.996 2.996 0 004 41c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.996 2.996 0 002.816-2H9c.266 0 .52-.105.707-.293L13.414 41H21v4a1 1 0 001 1h5v3.307l-7.352 2.757A1 1 0 0019 53v4.184A2.996 2.996 0 0017 60c0 1.654 1.346 3 3 3s3-1.346 3-3a2.996 2.996 0 00-2-2.816v-3.491l6-2.25v1.741A2.996 2.996 0 0025 56c0 1.654 1.346 3 3 3s3-1.346 3-3a2.996 2.996 0 00-2-2.816V46h6v11.184A2.996 2.996 0 0033 60c0 1.654 1.346 3 3 3s3-1.346 3-3a2.996 2.996 0 00-2-2.816V46h2v5c0 .265.105.52.293.707L43 55.414v1.77A2.996 2.996 0 0041 60c0 1.654 1.346 3 3 3s3-1.346 3-3a2.996 2.996 0 00-2-2.816V55a.997.997 0 00-.293-.707L41 50.586V46h1a1 1 0 001-1v-8h6.307l2.757 7.351A1 1 0 0053 45h4.184A2.996 2.996 0 0060 47c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.996 2.996 0 00-2.816 2h-3.491l-2.25-6h1.741A2.996 2.996 0 0056 39c1.654 0 3-1.346 3-3s-1.346-3-3-3a2.996 2.996 0 00-2.816 2H43v-2a1 1 0 00-1-1h-1v-3h16.184zM60 27a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm0-8a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zM44 3a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm-8 4a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm-8-4a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm-8 0a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zM4 21a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm4 8a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm-4 8a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm0 8a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm16 16a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm8-4a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm8 4a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm8 0a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm16-18a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm-4-8a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm-25 4a1.001 1.001 0 111 1c-.552 0-1-.449-1-1zm10 5h-8v-2.184A2.996 2.996 0 0035 39c0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816V44h-8V34h18v10zm-6-12h-6v-5c0-1.654 1.346-3 3-3s3 1.346 3 3v5zm2 0v-5c0-2.757-2.243-5-5-5s-5 2.243-5 5v5h-2v-5c0-3.86 3.141-7 7-7s7 3.14 7 7v5h-2z" />
      </svg>
    ),
    title: 'Hash编码工厂',
    description: '对数据内容进行各种编码，包括但不限于 sha, md5, bcrypt.',
  },
  {
    href: '/tools/hash',
    icon: (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
    title: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
  },
  {
    href: '/tools/hash',
    icon: (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Integrations',
    description: "Your customers' data will be safe and secure.",
  },
  {
    href: '/tools/hash',

    icon: (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    title: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
  },
];
const ToolMenuContent: React.FC<{ className? }> = ({ className }) => {
  const items = ToolItems;
  return (
    <div className={classNames('hidden md:block absolute z-10 inset-x-0 shadow-lg', className)}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
          {items.map(({ href, icon, title, description }, i) => {
            return (
              <Link href={href} key={i}>
                <a href="#" className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50">
                  <div className="flex md:h-full lg:flex-col">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                        <Icon icon={icon} className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                      <div>
                        <p className="text-base font-medium text-gray-900">{title}</p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                      </div>
                      <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                        前往 <span aria-hidden="true">&rarr;</span>
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
          <div className="flow-root">
            <a
              href="#"
              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <PlayOutline className="flex-shrink-0 h-6 w-6 text-gray-400" />
              <span className="ml-3">源码</span>
            </a>
          </div>

          <div className="flow-root">
            <Link href="/tools">
              <a
                href="#"
                className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                <ViewGridOutline className="flex-shrink-0 h-6 w-6 text-gray-400" />
                <span className="ml-3">所有工具</span>
              </a>
            </Link>
          </div>

          <div className="flow-root">
            <IsomorphicLink
              href="https://github.com/wenerme/apis/issues"
              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <QuestionMarkCircleOutline className="flex-shrink-0 h-6 w-6 text-gray-400" />
              <span className="ml-3">提问</span>
            </IsomorphicLink>
          </div>
        </div>
      </div>
    </div>
  );
};
const AppMenu: React.FC<{ visible }> = ({ visible }) => {
  return (
    <MenuPanelTransition visible={visible} hiddenClassName={'md:hidden'}>
      <AppMenuContent />
    </MenuPanelTransition>
  );
};
const AppMenuContent: React.FC<{ className? }> = ({ className }) => {
  return (
    <div className={classNames('hidden md:block absolute z-10 inset-x-0 transform shadow-lg', className)}>
      <div className="absolute inset-0 flex">
        <div className="bg-white w-1/2"></div>
        <div className="bg-gray-50 w-1/2"></div>
      </div>
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        <nav className="grid gap-y-10 px-4 py-8 bg-white sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
          <div>
            <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">信息</h3>
            <ul className="mt-5 space-y-6">
              <li className="flow-root">
                <a
                  href="#"
                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <InformationCircleOutline className="flex-shrink-0 h-6 w-6 text-gray-400" />
                  <span className="ml-4">About</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">开发运维</h3>
            <ul className="mt-5 space-y-6">
              <li className="flow-root">
                <a
                  href="#"
                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="ml-4">Community</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
          <div>
            <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">博客文章</h3>
            <ul className="mt-6 space-y-6">
              <li className="flow-root">
                <IsomorphicLink
                  href="https://www.wener.tech/story/why-need-graphql"
                  className="-m-3 p-3 flex rounded-lg hover:bg-gray-100"
                >
                  <div className="hidden sm:block flex-shrink-0">
                    <img
                      className="w-32 h-20 object-cover rounded-md"
                      src="https://images.unsplash.com/photo-1558478551-1a378f63328e"
                      alt=""
                    />
                  </div>
                  <div className="w-0 flex-1 sm:ml-8">
                    <h4 className="text-base font-medium text-gray-900 truncate">为什么需要 GraphQL？</h4>
                    <p className="mt-1 text-sm text-gray-500">当终端越来越多，开发人员越来越复杂时。</p>
                  </div>
                </IsomorphicLink>
              </li>
              <li className="flow-root">
                <IsomorphicLink
                  href="https://www.wener.tech/story/understand-baby-vision"
                  className="-m-3 p-3 flex rounded-lg hover:bg-gray-100"
                >
                  <div className="hidden sm:block flex-shrink-0">
                    <img
                      className="w-32 h-20 object-cover rounded-md"
                      src="https://images.unsplash.com/1/apple-gear-looking-pretty.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-0 flex-1 sm:ml-8">
                    <h4 className="text-base font-medium text-gray-900 truncate">理解孩子的视力</h4>
                    <p className="mt-1 text-sm text-gray-500">❤️</p>
                  </div>
                </IsomorphicLink>
              </li>
            </ul>
          </div>
          <div className="mt-6 text-sm font-medium">
            <IsomorphicLink href="https://wener.me/story" className="text-indigo-600 hover:text-indigo-500">
              {' '}
              所有文章 <span aria-hidden="true">&rarr;</span>
            </IsomorphicLink>
          </div>
        </div>
      </div>
    </div>
  );
};
/*
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
 */
const MobileMenu: React.FC<{ visible; onClose? }> = ({ visible, onClose }) => {
  const [hidden, setHidden] = useState(true);
  const hiddenClassName = 'hidden';
  return (
    <CSSTransition
      in={visible}
      timeout={{
        enter: 200,
        exit: 100,
      }}
      onEnter={() => setHidden(false)}
      classNames={{
        enter: 'ease-out duration-200 opacity-0 scale-95',
        enterActive: 'opacity-100 scale-100',
        enterDone: 'opacity-100 scale-100',
        exit: 'ease-in duration-100',
        exitActive: 'opacity-0 scale-95',
        exitDone: `opacity-0 scale-95 ${hiddenClassName}`,
      }}
    >
      <MobileMenuContent
        onClose={onClose}
        className={classNames('transform transition opacity-0', hidden && hiddenClassName)}
      />
    </CSSTransition>
  );
};

const MobileMenuContent: React.FC<{ className?; onClose? }> = ({ className, onClose }) => {
  return (
    <div
      className={classNames(
        'absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden',
        className,
      )}
    >
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
        <div className="pt-5 pb-6 px-5 sm:pb-8">
          <div className="flex items-center justify-between">
            <div>
              <LogoSvg className="h-8 w-auto text-blue-500" />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => onClose?.()}
              >
                <span className="sr-only">Close menu</span>
                <XOutline className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <nav>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                {ToolItems.map(({ icon, title, href }, i) => {
                  return (
                    <IsomorphicLink
                      key={i}
                      href={href}
                      className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                        <Icon icon={icon} className="h-6 w-6" />
                      </div>
                      <div className="ml-4 text-base font-medium text-gray-900">{title}</div>
                    </IsomorphicLink>
                  );
                })}
              </div>
              <div className="mt-8 text-base">
                <IsomorphicLink href="/tools" className="font-medium text-indigo-600 hover:text-indigo-500">
                  {' '}
                  所有工具 <span aria-hidden="true">&rarr;</span>
                </IsomorphicLink>
              </div>
            </nav>
          </div>
        </div>
        <div className="py-6 px-5">
          <div className="grid grid-cols-2 gap-4">
            <ExternalLink
              href="https://wener.me/story"
              className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
            >
              博客
            </ExternalLink>
            <ExternalLink
              href="https://github.com/wenerme/apis/issues"
              className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
            >
              提问
            </ExternalLink>
          </div>
          <div className="mt-6">
            {/*<a
              href="#"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </a>*/}
            <p className="mt-6 text-center text-base font-medium text-gray-500">
              <ExternalLink href="https://github.com/wenerme/apis" className="text-indigo-600 hover:text-indigo-500">
                Github
              </ExternalLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
