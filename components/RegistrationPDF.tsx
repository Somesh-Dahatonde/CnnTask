import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

// PDF Component
export function RegistrationPDF({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Registration Confirmation</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Name:</Text>
          <Text>{data.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email:</Text>
          <Text>{data.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Mobile:</Text>
          <Text>{data.mobile}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text>{data.payment?.transactionId}</Text>
        </View>
      </Page>
    </Document>
  );
}
