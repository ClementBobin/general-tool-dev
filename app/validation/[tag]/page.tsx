"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import crit from "@/config";
import { CircleHelp } from "lucide-react";
import { AlertDestructive } from "@/components/ui/alert-error";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Item } from '../../item/item'

const formSchema = z.object({
  criteria: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string().optional(),
    })
  ),
});

function Page({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const [tag, setTag] = useState<string>('');
  const [criteria, setCriteria] = useState<{ tags: Array<string>; ref: string; title: string; measure: string; verification_tool: string; caractere: string; resultat: string; }[]>([]);

  useEffect(() => {
    params.then(({ tag }) => setTag(tag.toLocaleUpperCase()));
  }, [params]);

  useEffect(() => {
    if (tag) {
      const filteredCriteria = crit.filter((item) => item.tags.includes(tag)).map(item => ({
        ...item,
        resultat: item.resultat || ''
      }));
      setCriteria(filteredCriteria);
    }
  }, [tag]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criteria: [],
    },
  });

  useEffect(() => {
    form.reset({ criteria });
  }, [criteria]);

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  if (!tag) {
    return <div>Loading...</div>;
  }

  if (!criteria.length) {
    return <AlertDestructive title="Aucun critère trouvé" description="Aucun critère n'a été trouvé pour ce tag." />;
  }

  return (
    <div>
      <Card className="w-[80vw]">
        <CardHeader>
          <CardTitle>Vérification de Conformité</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
              {criteria.map((criterion, index) => (
                <FormField
                  key={criterion.ref}
                  control={form.control}
                  name={`criteria.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <HoverCard>
                          <HoverCardTrigger href={`/item/${criterion.ref}`}>
                            <CircleHelp size={16} color="blue"/>
                            <HoverCardContent className="w-[75vw] translate-x-5">
                              <Item item={criterion} />
                            </HoverCardContent>
                          </HoverCardTrigger>
                        </HoverCard>
                        {criterion.title}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Entrer une valeur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="col-span-3">
                <Button type="submit" className="w-full">Valider</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;