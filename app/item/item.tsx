import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export function Item({ item, className }: { item: { tags: Array<string>; ref: string; description: string; docs?: string | string[]; title: string; measure: string; verification_tool?: string; caractere: string; resultat?: string; }, className?: string}) {
    return (
        <Card key={item.ref} className={className}>
            <CardHeader>
                <CardTitle>{item.ref} : {item.title}</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-2'>
                <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                        <Link key={index} href={`/validation/${tag}`} className="text-blue-500 hover:underline">
                            {tag}
                            {index < item.tags.length - 1 ? ', ' : ''}
                        </Link>
                    ))}
                </div>
                <div>
                    {item.description.split('\n').map((line, index) => (
                        <p key={index}>{line}<br /></p>
                    ))}
                </div>
                <div>{item.caractere} {item.verification_tool ? `- ${item.verification_tool}` : ''} {item.docs ? `- ${Array.isArray(item.docs) ? item.docs.join(', ') : item.docs}` : ''}</div>
            </CardContent>
        </Card>
    );
}
