import Navbar from '../../components/navbar';
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
      <main className="flex flex-row">
        <div className="nav" style={{width: '200px', height: '100vh'}}>
          <div className="flex flex-col" style={{height: '100%', 'padding': '10px'}}>
            <div style={{height: '80px'}}>logo</div>
            <div><Navbar></Navbar></div>
          </div>
        </div>
        <div className="container w-10" style={{width: 'calc(100% - 200px)'}}>
          <div className="flex flex-col" style={{height: '100%', 'padding': '10px 10px 10px 0px'}}>
            <div style={{height: '80px'}}>logo</div>
            <div className="bg-slate-400 rounded-2xl text-white text-sm" style={{height: 'calc(100vh - 100px)', 'padding': '10px'}}>
              <div>{children}</div>
            </div>
          </div>
        </div>    
      </main>
    </section>
  }