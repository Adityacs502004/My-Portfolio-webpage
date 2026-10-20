const Navbar = () => {

  function handlerefresh() {
    window.location.reload()
  }

  return (
    <header className='sticky top-0 z-20'>
      <div className='mx-auto flex h-fit w-[95%] items-center-safe justify-between rounded-xl bg-gray-900 p-2'>
        <button
          type='button'
          onClick={handlerefresh}
          aria-label='Refresh profile'
          className='h-12 w-12 cursor_pointer cursor-none rounded-xl bg-[url("/Profile_logo.png")] bg-contain bg-no-repeat'
        />
        <div className='w-[35%] h-full flex justify-between'>
            <div >[Projects]</div>
            <div>[Images]</div>
        </div>
      </div>
    </header>
  )
}

export default Navbar