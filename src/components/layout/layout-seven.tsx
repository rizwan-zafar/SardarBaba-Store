import Header from '@components/layout/header/header-seven';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow pt-16 lg:pt-20"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
