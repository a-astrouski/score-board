'use client';

import StartGameForm from '@/components/StartGameForm/StartGameForm';
import MatchList from '@/components/MatchList/MatchList';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto p-4 md:p-8">
                <header className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground">
                            Score Board
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground">Your Live Football World Cup Score Board</p>
                </header>

                <section className="mb-8 max-w-2xl mx-auto">
                    <StartGameForm />
                </section>

                <MatchList />
            </main>
        </div>
    );
}
