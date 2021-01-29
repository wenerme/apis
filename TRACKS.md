* 目标
  * 初次加载 CSS 应该小于 300 kB
  * 初期以 SSR 为准

# 20210129

```
Page                                                           Size     First Load JS
┌ ○ /                                                          276 B           397 kB
├   /_app                                                      0 B            64.3 kB
├ ○ /404                                                       491 B           397 kB
├ λ /api                                                       0 B            64.3 kB
├ λ /api/[...params]                                           0 B            64.3 kB
├ λ /api/frontend/bootstrap.js                                 0 B            64.3 kB
├ ○ /barcode/linear/builder                                    12.4 kB         728 kB
├ ○ /barcode/linear/reader                                     3.12 kB         405 kB
├ ○ /barcode/qrcode/builder                                    9.87 kB         504 kB
├ ○ /barcode/qrcode/reader                                     1.25 kB         625 kB
├ ○ /barcode/scanner                                           481 B           597 kB
├ ○ /demo                                                      475 B           597 kB
├ ○ /editor/prettier                                           5.55 kB         641 kB
├ ○ /editor/prosemirror                                        123 kB          797 kB
├ ○ /editor/simple-code                                        3.67 kB         632 kB
├ ○ /editor/slate                                              36.8 kB         634 kB
├ ○ /editor/slate-md                                           2.42 kB         599 kB
├ ○ /geo/me                                                    2.36 kB         378 kB
├ λ /hash/digest                                               228 B           395 kB
├ λ /hash/md/[algorithm]                                       234 B           395 kB
├ λ /hash/md/[algorithm]/[content]                             188 B           395 kB
├ ○ /ipfs/gateway/checker                                      9.55 kB         385 kB
├ ○ /kong/admin                                                2.29 kB         373 kB
├ ○ /langs/asterisk-conf/play                                  486 B           677 kB
├ ○ /langs/html-entities/play                                  397 B           456 kB
├ ○ /langs/ini/play                                            1.09 kB         630 kB
├ ○ /langs/xml/play                                            11.6 kB         410 kB
├ λ /lite                                                      3.08 kB        67.3 kB
├ ○ /password/strength                                         226 B           788 kB
├ λ /password/strength/[password]                              288 B           788 kB
├ ○ /phone/attribution                                         3.29 kB         387 kB
├ λ /phone/attribution/[num]                                   3.45 kB         387 kB
├ ○ /pki/pem/reader                                            14.4 kB         408 kB
├ ○ /uri/url                                                   4.46 kB         452 kB
├ ○ /webrtc/checker                                            8.38 kB         384 kB
├ ○ /webtorrent/bencode                                        22 kB           657 kB
├ ○ /webtorrent/client                                         2.83 kB         378 kB
└ ○ /webtorrent/torrent/reader                                 46.6 kB         755 kB
+ First Load JS shared by all                                  64.3 kB
  ├ chunks/aa9296a8a6158e40c72dae90d51291d79c1fe676.9af41d.js  8.5 kB
  ├ chunks/framework.36e5d3.js                                 42.3 kB
  ├ chunks/main.bac46c.js                                      5.79 kB
  ├ chunks/pages/_app.41f062.js                                5.62 kB
  ├ chunks/webpack.09961b.js                                   2.06 kB
  └ css/742a953342d1fe5f3911.css                               819 B
λ  (Lambda)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```

# 20200512

```
Page                                                           Size     First Load JS
┌ ○ /                                                          20.9 kB         695 kB
├   /_app                                                      5.71 kB        65.2 kB
├ ○ /404                                                       3.28 kB        68.4 kB
├ λ /api
├ λ /api/[...params]
├ λ /api/phone/attribution/[num]
├ ○ /barcode/linear/builder                                    12.3 kB         805 kB
├ ○ /barcode/linear/reader                                     4.08 kB         713 kB
├ ○ /barcode/qrcode/builder                                    9.69 kB         802 kB
├ ○ /barcode/qrcode/reader                                     1.41 kB         710 kB
├ ○ /barcode/scanner                                           458 B           675 kB
├ ○ /demo                                                      452 B           675 kB
├ ○ /editor/prettier                                           8.94 kB         720 kB
├ ○ /editor/prosemirror                                        125 kB          877 kB
├ ○ /editor/simple-code                                        3.29 kB         707 kB
├ ○ /editor/slate                                              37.3 kB         712 kB
├ ○ /editor/slate-md                                           2.82 kB         677 kB
├ ○ /geo/me                                                    2.79 kB         677 kB
├ λ /hash/digest                                               233 B           702 kB
├ λ /hash/md/[algorithm]                                       238 B           702 kB
├ λ /hash/md/[algorithm]/[content]                             191 B           702 kB
├ ○ /ipfs/gateway/checker                                      7.52 kB         688 kB
├ ○ /kong/admin                                                2.72 kB         669 kB
├ ○ /password/strength                                         226 B          1.09 MB
├ λ /password/strength/[password]                              287 B          1.09 MB
├ ○ /phone/attribution                                         225 B           692 kB
├ λ /phone/attribution/[num]                                   567 B           692 kB
├ ○ /phone/attribution/README                                  1.39 kB        66.6 kB
├ ○ /pki/pem/reader                                            16 kB           712 kB
├ ○ /uri/url                                                   4.68 kB         765 kB
├ ○ /webrtc/checker                                            11.6 kB         686 kB
├ ○ /webtorrent/bencode                                        17 kB           740 kB
├ ○ /webtorrent/client                                         3.51 kB         678 kB
└ ○ /webtorrent/torrent/reader                                 49.4 kB         857 kB
+ First Load JS shared by all                                  65.2 kB
  ├ static/pages/_app.js                                       5.71 kB
  ├ chunks/9cae3cfeb9fbab8c377e4cb9d1668e73b247c8bf.6c483c.js  10.7 kB
  ├ chunks/framework.b31ba6.js                                 40.5 kB
  ├ runtime/main.1a71a0.js                                     6.35 kB
  ├ runtime/webpack.9aafa1.js                                  1.95 kB
  └ css/bae2bf0d84e1a5b83a99.css                               721 B
λ  (Lambda)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
Done in 308.58s.
```
