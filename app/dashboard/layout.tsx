import Navbar from '../../components/navbar';
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="flex w-full">
      <main className="flex flex-row w-full">
        <div className="nav h-full" style={{width: '200px'}}>
          <div className="flex flex-col">
            <Navbar></Navbar>
          </div>
        </div>
        <div style={{width: 'calc(100% - 200px)'}}>
          <div className="flex flex-col">
            <div className="text-sm">
              {children}
            </div>
          </div>
        </div>    
      </main>
    </section>
  }