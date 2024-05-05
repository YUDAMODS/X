const axios = require('axios');
const fs = require('fs');

const proxies = [];
const output_file = 'proxy.txt';

if (fs.existsSync(output_file)) {
  fs.unlinkSync(output_file);
  console.log(`'${output_file}' telah dihapus.`);
}

const raw_proxy_sites = [
"https://github.com/TheSpeedX/PROXY-List/blob/master/http.txt",
"https://github.com/TheSpeedX/PROXY-List/blob/master/socks4.txt",
"https://github.com/TheSpeedX/PROXY-List/blob/master/socks5.txt",
"https://github.com/hookzof/socks5_list/blob/master/proxy.txt",
"https://github.com/sunny9577/proxy-scraper/blob/master/proxies.txt",
"https://github.com/MuRongPIG/Proxy-Master/blob/main/http.txt",
 "https://api.proxyscrape.com/?request=displayproxies&proxytype=socks4&country=all",
        "https://www.proxy-list.download/api/v1/get?type=socks4",
        "https://www.proxyscan.io/download?type=socks4",
        "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt",
        "https://api.openproxylist.xyz/socks4.txt",
        "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt",
        "https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt",
        "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt",
        "https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt",
        "https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks4.txt",
        "https://proxylist.live/nodes/socks4_1.php?page=1&showall=1",
        "https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks4.txt",
        "https://openproxy.space/list/socks4",
        "https://github.com/hanwayTech/free-proxy-list/blob/main/socks4.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt",
        "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/socks4.txt",
        "https://proxyspace.pro/socks4.txt",
        "https://raw.githubusercontent.com/ObcbO/getproxy/master/socks4.txt",
        "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all&simplified=true",
        "https://www.proxy-list.download/api/v1/get?type=socks5",
        "https://www.proxyscan.io/download?type=socks5",
        "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt",
        "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt",
        "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt",
        "https://api.openproxylist.xyz/socks5.txt",
        "https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt",
        "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt",
        "https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt",
        "https://raw.githubusercontent.com/manuGMG/proxy-365/main/SOCKS5.txt",
        "https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks5.txt",
        "https://github.com/hanwayTech/free-proxy-list/blob/main/socks5.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt",
        "https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks5.txt",
        "https://openproxy.space/list/socks5",
        "https://proxylist.live/nodes/socks5_1.php?page=1&showall=1",
        "https://spys.me/socks.txt",
        "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/socks5.txt",
        "https://proxyspace.pro/socks5.txt",
        "https://raw.githubusercontent.com/zevtyardt/proxy-list/main/socks5.txt",
        "https://api.proxyscrape.com/?request=displayproxies&proxytype=http",
        "https://www.proxy-list.download/api/v1/get?type=http",
        "https://www.proxy-list.download/api/v1/get?type=https",
        "https://www.proxyscan.io/download?type=http",
        "https://spys.me/proxy.txt",
        "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
        "https://api.openproxylist.xyz/http.txt",
        "https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt",
        "http://alexa.lr2b.com/proxylist.txt",
        "http://rootjazz.com/proxies/proxies.txt",
        "http://proxysearcher.sourceforge.net/Proxy%20List.php?type=http",
        "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
        "https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt",
        "https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt",
        "https://proxy-spider.com/api/proxies.example.txt",
        "https://multiproxy.org/txt_all/proxy.txt",
        "https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt",
        "https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/http.txt",
        "https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/https.txt",
        "https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt",
        "https://openproxy.space/list/http",
        "https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt",
        "https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt",
        "https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt",
        "https://raw.githubusercontent.com/almroot/proxylist/master/list.txt",
        "https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt",
        "https://raw.githubusercontent.com/saisuiu/uiu/main/free.txt",
        "https://proxylist.live/nodes/free_1.php?page=1&showall=1",
        "https://raw.githubusercontent.com/hanwayTech/free-proxy-list/main/http.txt",
        "https://raw.githubusercontent.com/hanwayTech/free-proxy-list/main/https.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt",
        "https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt",
        "https://raw.githubusercontent.com/rx443/proxy-list/online/all.txt",
        "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/http.txt",
        "https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/https.txt",
        "https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt",
        "https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxy-list/data.txt",
        "https://raw.githubusercontent.com/andigwandi/free-proxy/main/proxy_list.txt",
        "https://raw.githubusercontent.com/ObcbO/getproxy/master/http.txt",
        "https://raw.githubusercontent.com/ObcbO/getproxy/master/https.txt",
        "https://sheesh.rip/http.txt",
        "https://proxyspace.pro/http.txt",
        "https://proxyspace.pro/https.txt",
        "https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt",
        'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt'
'https://raw.githubusercontent.com/mallisc5/master/proxy-list-raw.txt'
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt'
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt'
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt'
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt'
'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt'
'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt'
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt'
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt'
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt'
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt'
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt'
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt'
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/https'
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http'
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt'
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt'
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt'
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt'
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt'
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt'
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt'
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt'
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-15-0111-am-gmt8.html'
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-13-812-gmt7.html'
'http://www.cybersyndrome.net/pla5.html'
'http://vipprox.blogspot.com/2013_06_01_archive.html'
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-74_24.html'
'http://vipprox.blogspot.com/p/blog-page_7.html'
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-199_20.html'
'http://vipprox.blogspot.com/2013_02_01_archive.html'
'http://alexa.lr2b.com/proxylist.txt'
'http://vipprox.blogspot.com/2013_03_01_archive.html'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196260'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196258'
'http://sock5us.blogspot.com/2013/06/01-07-13-free-proxy-server-list.html'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196251'
'http://free-ssh.blogspot.com/feeds/posts/default'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196259'
'http://sockproxy.blogspot.com/2013/04/11-04-13-socks-45.html'
'http://proxyfirenet.blogspot.com/'
'https://www.javatpoint.com/proxy-server-list'
'https://openproxy.space/list/http'
'http://proxydb.net/'
'http://olaf4snow.com/public/proxy.txt'
'http://westdollar.narod.ru/proxy.htm'
'https://openproxy.space/list/socks4'
'https://openproxy.space/list/socks5'
'http://tomoney.narod.ru/help/proxi.htm'
'http://sergei-m.narod.ru/proxy.htm'
'http://rammstein.narod.ru/proxy.html'
'http://greenrain.bos.ru/R_Stuff/Proxy.htm'
'http://inav.chat.ru/ftp/proxy.txt'
'http://johnstudio0.tripod.com/index1.htm'
'http://atomintersoft.com/transparent_proxy_list'
'http://atomintersoft.com/anonymous_proxy_list'
'http://atomintersoft.com/high_anonymity_elite_proxy_list'
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
"https://www.proxy-list.download/api/v1/get?type=http",
"https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
'https://github.com/Tsprnay/Proxy-lists/raw/master/proxies/http.txt',
'https://github.com/Tsprnay/Proxy-lists/raw/master/proxies/https.txt',
'https://github.com/proxy4parsing/proxy-list/raw/main/http.txt',
'https://github.com/vakhov/fresh-proxy-list/raw/master/http.txt',
'https://github.com/vakhov/fresh-proxy-list/raw/master/https.txt',
'https://github.com/TuanMinPay/live-proxy/raw/master/http.txt',
'https://github.com/yemixzy/proxy-list/raw/main/proxies/unchecked.txt',
'https://github.com/andigwandi/free-proxy/raw/main/proxy_list.txt',
'https://github.com/elliottophellia/yakumo/raw/master/results/http/global/http_checked.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
'https://api.openproxylist.xyz/http.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://naawy.com/api/public/proxylist/getList/?proxyType=http&format=txt',
'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
'https://github.com/BlackCage/Proxy-Scraper-and-Verifier/raw/main/Proxies/Not_Processed/proxies.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/http/global/http_checked.txt',
'https://github.com/hookzof/socks5_list/raw/master/proxy.txt',
'https://github.com/vakhov/fresh-proxy-list/raw/master/socks5.txt',
'https://github.com/ALIILAPRO/Proxy/raw/main/socks5.txt',
'https://github.com/casals-ar/proxy-list/raw/main/socks5',
'https://github.com/monosans/proxy-list/raw/main/proxies/socks5.txt',
'https://github.com/Zaeem20/FREE_PROXIES_LIST/raw/master/socks5.txt',
'https://github.com/vakhov/fresh-proxy-list/raw/master/socks5.txt',
'https://github.com/MyZest/update-live-socks5/raw/master/liveSocks5.txt',
'https://github.com/ObcbO/getproxy/raw/master/file/socks5.txt',
'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://github.com/Stretzx/Prxy/blob/main/http_proxies%20(1).txt',
'https://github.com/Stretzx/Prxy/blob/main/http_proxies%20(2).txt',
'https://github.com/Stretzx/Prxy/blob/main/http_proxies.txt',
'https://github.com/Stretzx/Prxy/blob/main/iraq.txt',
'https://github.com/Stretzx/Prxy/blob/main/jewish.txt',
'https://github.com/Stretzx/Prxy/blob/main/proxy.txt',
'https://github.com/Stretzx/Prxy/blob/main/german.txt',
'https://github.com/Stretzx/Prxy/blob/main/china.txt',
'https://github.com/Stretzx/Prxy/blob/main/SSLProxies.txt',
'https://github.com/Stretzx/Prxy/blob/main/S5Proxies.txt',
'https://github.com/Stretzx/Prxy/blob/main/S4Proxies.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://github.com/TheSpeedX/PROXY-List/blob/master/http.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all',
'https://github.com/TheSpeedX/PROXY-List/blob/master/socks4.txt',
'https://github.com/TheSpeedX/PROXY-List/blob/master/socks5.txt',
'https://github.com/clarketm/proxy-list/blob/master/proxy-list.txt',
'https://github.com/clarketm/proxy-list/blob/master/proxy-list-status.txt',
'https://github.com/clarketm/proxy-list/blob/master/proxy-list-raw.txt',
'https://github.com/hookzof/socks5_list/blob/master/proxy.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies/http.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies/socks4.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies/socks5.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies/socks5.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_geolocation/http.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_geolocation/socks4.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_geolocation/socks5.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_anonymous/http.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_anonymous/socks4.txt',
'https://github.com/monosans/proxy-list/blob/main/proxies_anonymous/socks5.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://www.proxyscan.io/download?type=http',
'http://spys.me/proxy.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
'https://api.openproxylist.xyz/http.txt',
'https://www.my-proxy.com/free-proxy-list.html',
'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
'https://www.my-proxy.com/free-anonymous-proxy.html',
'https://www.my-proxy.com/free-transparent-proxy.html',
'https://www.my-proxy.com/free-proxy-list-2.html',
'https://www.my-proxy.com/free-proxy-list-3.html',
'https://www.my-proxy.com/free-proxy-list-4.html',
'https://proxy50-50.blogspot.com/',
'https://www.my-proxy.com/free-proxy-list-5.html',
'http://alexa.lr2b.com/proxylist.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://www.freeproxychecker.com/result/http_proxies.txt',
'https://www.my-proxy.com/free-socks-4-proxy.html',
'http://www.proxyserverlist24.top/feeds/posts/default',
'https://www.my-proxy.com/free-proxy-list-6.html',
'https://www.my-proxy.com/free-proxy-list-7.html',
'https://www.my-proxy.com/free-proxy-list-8.html',
'http://proxysearcher.sourceforge.net/Proxy%20List.php?type=http',
'https://www.my-proxy.com/free-proxy-list-9.html',
'https://www.my-proxy.com/free-proxy-list-10.html',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/http.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://raw.githubusercontent.com/clarketm/proxy',
'http://k2ysarchive.xyz/proxy/http.txt',
'https://proxyspace.pro/http.txt',
'https://proxyspace.pro/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt'
'https://raw.githubusercontent.com/mallisc5/master/proxy-list-raw.txt'
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt'
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt'
'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/free.txt'
'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt'
'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt'
'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt'
'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt'
'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt'
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt'
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt'
'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt'
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt'
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/https'
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http'
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt'
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt'
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt'
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt'
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt'
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt'
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt'
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt'
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt'
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-15-0111-am-gmt8.html'
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-13-812-gmt7.html'
'http://www.cybersyndrome.net/pla5.html'
'http://vipprox.blogspot.com/2013_06_01_archive.html'
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-74_24.html'
'http://vipprox.blogspot.com/p/blog-page_7.html'
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-199_20.html'
'http://vipprox.blogspot.com/2013_02_01_archive.html'
'http://alexa.lr2b.com/proxylist.txt'
'http://vipprox.blogspot.com/2013_03_01_archive.html'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196260'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196258'
'http://sock5us.blogspot.com/2013/06/01-07-13-free-proxy-server-list.html'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196251'
'http://free-ssh.blogspot.com/feeds/posts/default'
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196259'
'http://sockproxy.blogspot.com/2013/04/11-04-13-socks-45.html'
'http://proxyfirenet.blogspot.com/'
'https://www.javatpoint.com/proxy-server-list'
'https://openproxy.space/list/http'
'http://proxydb.net/'
'http://olaf4snow.com/public/proxy.txt'
'http://westdollar.narod.ru/proxy.htm'
'https://openproxy.space/list/socks4'
'https://openproxy.space/list/socks5'
'http://tomoney.narod.ru/help/proxi.htm'
'http://sergei-m.narod.ru/proxy.htm'
'http://rammstein.narod.ru/proxy.html'
'http://greenrain.bos.ru/R_Stuff/Proxy.htm'
'http://inav.chat.ru/ftp/proxy.txt'
'http://johnstudio0.tripod.com/index1.htm'
'http://atomintersoft.com/transparent_proxy_list'
'http://atomintersoft.com/anonymous_proxy_list'
'http://atomintersoft.com/high_anonymity_elite_proxy_list'
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://worm.rip/https.txt',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/all.txt',
'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/socks4.txt',
'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/socks5.txt',
'https://github.com/whonion/go-parse-proxy-geonode/blob/main/Free_Proxy_List.json',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=socks5',
'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all&simplified=true',
'https://www.proxyscan.io/download?type=http',
'https://proxyspace.pro/socks5.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://www.proxy-list.download/api/v1/get?type=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-15-0111-am-gmt8.html',
'http://freeproxylist-daily.blogspot.com/2013/05/usa-proxy-list-2013-05-13-812-gmt7.html',
'http://vipprox.blogspot.com/2013_06_01_archive.html',
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-74_24.html',
'http://vipprox.blogspot.com/p/blog-page_7.html',
'http://vipprox.blogspot.com/2013/05/us-proxy-servers-199_20.html',
'http://vipprox.blogspot.com/2013_02_01_archive.html',
'http://alexa.lr2b.com/proxylist.txt',
'http://vipprox.blogspot.com/2013_03_01_archive.html',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196251',
'http://free-ssh.blogspot.com/feeds/posts/default',
'http://browse.feedreader.com/c/Proxy_Server_List-1/449196259',
'http://sockproxy.blogspot.com/2013/04/11-04-13-socks-45.html',
'http://proxyfirenet.blogspot.com/',
'https://www.javatpoint.com/proxy-server-list',
'https://openproxy.space/list/http',
'http://proxydb.net/',
'http://olaf4snow.com/public/proxy.txt',
'https://openproxy.space/list/socks4',
'https://openproxy.space/list/socks5',
'http://rammstein.narod.ru/proxy.html',
'http://greenrain.bos.ru/R_Stuff/Proxy.htm',
'http://inav.chat.ru/ftp/proxy.txt',
'http://johnstudio0.tripod.com/index1.htm',
'http://atomintersoft.com/transparent_proxy_list',
'http://atomintersoft.com/anonymous_proxy_list',
'http://atomintersoft.com/high_anonymity_elite_proxy_list',
'http://atomintersoft.com/products/alive-proxy/proxy-list/3128',
'http://atomintersoft.com/products/alive-proxy/proxy-list/com',
'http://atomintersoft.com/products/alive-proxy/proxy-list/high-anonymity/',
'http://atomintersoft.com/products/alive-proxy/socks5-list',
'http://atomintersoft.com/proxy_list_domain_com',
'http://atomintersoft.com/proxy_list_domain_edu',
'http://atomintersoft.com/proxy_list_domain_net',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
'http://atomintersoft.com/proxy_list_domain_org',
'http://atomintersoft.com/proxy_list_port_3128',
'http://atomintersoft.com/proxy_list_port_80',
'http://atomintersoft.com/proxy_list_port_8000',
'http://atomintersoft.com/proxy_list_port_81',
'http://hack-hack.chat.ru/proxy/allproxy.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'http://hack-hack.chat.ru/proxy/anon.tx',
'http://hack-hack.chat.ru/proxy/p1.txt',
'http://hack-hack.chat.ru/proxy/p2.txt',
'http://hack-hack.chat.ru/proxy/p3.txt',
'http://hack-hack.chat.ru/proxy/p4.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://api.proxyscrape.com/?request=getproxies&proxytype=https&timeout=10000&country=all&ssl=all&anonymity=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
    'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all&ssl=all&anonymity=all',
    'https://www.proxy-list.download/api/v1/get?type=socks5',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
    'https://openproxylist.xyz/socks5.txt',
    'https://sunny9577.github.io/proxy-scraper/generated/socks5_proxies.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    'https://openproxy.space/list/socks5',
    'https://proxyspace.pro/socks5.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt',
    # 15/01/2024
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
    'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks5',
    'https://raw.githubusercontent.com/im-razvan/proxy_list/main/socks5.txt',
    'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/socks5/global/socks5_checked.txt',
    'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
    'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks5_proxies.txt',
    'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
    'https://api.proxyscrape.com/v2/?request=displayproxies',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'http://worm.rip/http.txt',
'http://alexa.lr2b.com/proxylist.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all',
'https://www.proxydocker.com/en/proxylist/download?email=noshare&country=all&city=all&port=all&type=all&anonymity=all&state=all&need=all',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous',
'http://free-proxy.cz/en/web-proxylist/',
'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all&ssl=all&anonymity=all',

   
  // ... tambahkan URL lainnya sesuai kebutuhan Anda
];

async function fetchProxies() {
  for (const site of raw_proxy_sites) {
    try {
      const response = await axios.get(site);
      const lines = response.data.split('\n');
      for (const line of lines) {
        if (line.includes(':')) {
          const [ip, port] = line.split(':', 2);
          proxies.push(`${ip}:${port}`);
        }
      }
    } catch (error) {
      console.error(`Gagal mengambil proxy dari ${site}: ${error.message}`);
    }
  }

  fs.writeFileSync(output_file, proxies.join('\n'));
  console.log(`Proxies berhasil diambil dan disimpan dalam ${output_file}`);
}

fetchProxies();
