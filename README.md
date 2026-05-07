# ik_personel_izin_sistemi
Kurumsal mimari prensiplerine uygun olarak geliştirilmiş İnsan Kaynakları (İK) ve Personel İzin Yönetim Sistemi projesidir. Frontend tarafında Angular, TypeScript, RxJS ve NgRx kullanılarak reactive state management yapısı kurulmuştur. Action, Reducer, Effect  mimarileri ile ölçeklenebilir ve sürdürülebilir bir frontend altyapısı hedeflenmiştir.
# İK Personel ve İzin Yönetim Sistemi

Bu proje, kurumsal mimari prensiplerine uygun olarak geliştirilmiş modern bir İnsan Kaynakları (İK) ve Personel Yönetim Sistemi uygulamasıdır.

Frontend tarafında Angular ve NgRx kullanılarak reactive state management yapısı oluşturulmuştur. Uygulama içerisinde Action, Reducer, Effect ve Store yapıları kullanılarak ölçeklenebilir ve sürdürülebilir bir mimari hedeflenmiştir.

Backend tarafında .NET 8, MediatR (CQRS), FluentValidation, JWT Authentication ve Clean Architecture prensipleri kullanılmıştır. Mikroservis mantığına uygun şekilde Personel, İzin ve Onay süreçleri birbirinden ayrılmıştır.

## Projede Kullanılan Teknolojiler

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* RxJS
* NgRx (Store, Action, Reducer, Effect)
* Reactive Programming

### Backend

* .NET 8
* ASP.NET Core Web API
* MediatR / CQRS
* Entity Framework Core
* SQL Server
* JWT Authentication
* FluentValidation
* Clean Architecture

## Uygulama Özellikleri

* Personel oluşturma ve yönetimi
* Departman yönetimi
* Yönetici atama ve silme işlemleri
* Personel izin talep sistemi
* İzin onay / reddetme sistemi
* JWT tabanlı authentication ve authorization
* Role-based access control
* Reactive state management
* Merkezi validation yapısı
* Kurumsal mimariye uygun katmanlı yapı

## Mimari Yapı

Frontend tarafında component bazlı modüler yapı kullanılmıştır. NgRx ile merkezi state yönetimi sağlanmıştır.

Backend tarafında ise:

* Command / Query ayrımı (CQRS)
* MediatR pipeline behavior
* Repository pattern
* ServiceResult pattern
* FluentValidation pipeline
* Dependency Injection

yaklaşımları uygulanmıştır.

Bu proje, ölçeklenebilir ve kurumsal düzeyde modern web uygulaması geliştirme pratiği amacıyla geliştirilmiştir.
