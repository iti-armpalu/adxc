// export function Footer() {
//     const year = new Date().getFullYear();

//     return (
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
//             <p className="text-muted-foreground/50 text-xs">
//                 © 2025 ADXC
//             </p>
//         </div>
//     )
// }


import Link from "next/link";


export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6 lg:px-8 text-center">

                {/* Bottom bar */}
                <div className="text-muted-foreground/50 text-xs">
                    <p>
                        © {year} ADXC. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}

