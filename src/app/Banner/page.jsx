import Image from "next/image";

const BannerPage = () => {
  return (
    <div className="relative z-2 h-[680px] w-full overflow-hidden">
      <Image
        src="/banner.png"
        alt="banner"
        fill
        className="object-cover relative"
        priority
      />
      <h2 className="z-1 relative">hisdsrfshercbzdhdfhzjvcnnnnnnnnnnnnnnnnnnnnnnnnnnm</h2>
    </div>
  );
};

export default BannerPage;