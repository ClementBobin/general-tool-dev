"use client";

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
} from "@/components/ui/hover-card";
import { Item } from '../../item/item';
import { jsPDF } from "jspdf";

const formSchema = z.object({
  criteria: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        value: z.string()
      })
  ),
});

function Page({
                params,
              }: {
  params: Promise<{ tag: string }>;
}) {
  const [tag, setTag] = useState<string>('');
  const [criteria, setCriteria] = useState<{
    tags: Array<string>;
    ref: string;
    title: string;
    measure: string;
    verification_tool?: string;
    caractere: string;
    resultat: string;
    level: number;
    description: string;
  }[]>([]);

  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    params.then(({ tag }) => setTag(tag.toLocaleUpperCase()));
  }, [params]);

  useEffect(() => {
    if (tag) {
      const filteredCriteria = crit
          .filter((item) => item.tags.includes(tag))
          .map((item) => ({
            ...item,
            resultat: item.resultat || '',
          }));
      setCriteria(filteredCriteria);
    }
  }, [tag]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      criteria: criteria.map(item => ({
        id: item.ref,
        name: item.title,
        value: ''
      }))
    },
  });

  useEffect(() => {
    if (criteria.length > 0) {
      form.reset({ 
        criteria: criteria.map(item => ({
          id: item.ref,
          name: item.title,
          value: ''
        }))
      });
    }
  }, [criteria]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);

    // Calculate the score
    let score = 0;
    let maxPossibleScore = 0;

    values.criteria.forEach((criterion, index) => {
      const criterionData = criteria[index];
      if (criterion.value) {
        score += criterionData.level;
      }
      maxPossibleScore += criterionData.level;
    });

    setTotalScore(score);
    setMaxScore(maxPossibleScore);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    doc.text('Verification de Conformité', 14, y);
    y += lineHeight;

    criteria.forEach((criterion, index) => {
      const text = `${criterion.title}: ${form.getValues(`criteria.${index}.value`) || 'Non renseigné'}`;
      const textHeight = doc.getTextDimensions(text).h;

      if (y + textHeight > pageHeight - lineHeight) {
        doc.addPage();
        y = 20;
      }

      doc.text(text, 14, y);
      y += textHeight + lineHeight;
    });

    if (y + lineHeight * 3 > pageHeight - lineHeight) {
      doc.addPage();
      y = 20;
    }

    doc.text(`Total Score: ${totalScore}`, 14, y);
    y += lineHeight;
    doc.text(`Max Score: ${maxScore}`, 14, y);
    y += lineHeight;
    doc.text(`Percentage: ${(totalScore / maxScore) * 100}%`, 14, y);

    doc.save('verification.pdf');
  };


  if (!tag) {
    return <div>Loading...</div>;
  }

  if (!criteria.length) {
    return (
        <AlertDestructive title="Aucun critère trouvé" description="Aucun critère n'a été trouvé pour ce tag." />
    );
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
                                    <CircleHelp size={16} color="blue" />
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
                  <Button type="submit" className="w-full">
                    Valider
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-4">
          <Button onClick={generatePDF}>Télécharger en PDF</Button>
        </div>

        {maxScore > 0 && (
            <div className="mt-4">
              <p>Score Gagné: {totalScore}</p>
              <p>Score Total: {maxScore}</p>
              <p>Pourcentage: {(totalScore / maxScore) * 100}%</p>
            </div>
        )}
      </div>
  );
}

export default Page;
